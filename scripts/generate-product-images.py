"""
珠宝产品图片生成脚本
读取参考图 -> 反推摄影风格 -> 生成新的产品图

工作流：
1. 读取 products/ 目录下每张参考图
2. 用 GPT-4o vision 分析摄影风格（光线、角度、布景、色调、构图）
3. 结合新产品的描述，生成风格一致但产品设计完全不同的新图片
4. 输出到 products/generated/ 目录
"""

import os
import sys
import time
import json
import base64
import requests
from pathlib import Path
from typing import Optional

# ============================================================
# 配置区域 - 按需修改
# ============================================================

AZURE_ENDPOINT = os.getenv(
    "AZURE_OPENAI_ENDPOINT",
    "https://admin-charli-resource.cognitiveservices.azure.com",
)
AZURE_API_KEY = os.getenv("AZURE_OPENAI_KEY", "")
# 图片生成部署
IMAGE_DEPLOYMENT = "gpt-image-2"
# 视觉分析部署（需要 GPT-4o 或类似 vision 模型，如果没配置则跳过反推步骤）
VISION_DEPLOYMENT = os.getenv("AZURE_VISION_DEPLOYMENT", "")  # 例如 "gpt-4o"

API_VERSION = "2024-02-01"
IMAGE_SIZE = "1024x1024"
QUALITY = "auto"  # low, medium, high, auto

# 路径
REF_DIR = Path(__file__).resolve().parent.parent / "public" / "images"
PRODUCTS_DIR = REF_DIR / "products"
OUTPUT_DIR = REF_DIR / "products" / "generated"
CATEGORIES_DIR = REF_DIR / "categories"
PROMO_DIR = REF_DIR / "promo"

# ============================================================
# 新产品描述映射 - 每张参考图对应要生成的全新产品
# 使用详细的 DALL-E 3 风格 prompt，精准描述珠宝产品摄影
# （产品描述要保持原创，不要复制原品牌设计）
# ============================================================

# 所有图片通用的摄影风格尾巴
PHOTO_STYLE_SUFFIX = (
    "Commercial jewelry product photography, soft directional studio lighting from 45-degree "
    "angle above with subtle fill from below, large softbox creating gentle highlights on metal surfaces, "
    "clean minimal seamless background with subtle gradient, shallow depth of field with sharp focus on the jewelry, "
    "high contrast with rich shadows, true-to-life color rendering with slightly warm white balance, "
    "ultra sharp detail rendering, 8K resolution, photorealistic, editorial quality, "
    "white space around subject for copy, color graded for luxury e-commerce"
)

# 产品图 -> 新产品描述（只写产品本身，摄影风格自动附加）
PRODUCT_PROMPTS = {
    "elisa-pendant.jpg": (
        "A modern geometric pendant necklace featuring a sleek open circle design "
        "in brushed gold with a small diamond accent at the top, suspended on a "
        "delicate 16-inch cable chain, centered in frame, slightly angled to show depth"
    ),
    "hoop-earrings.jpg": (
        "Medium-sized hoop earrings in matte finished yellow gold, "
        "sleek and minimal design approximately 1.5 inches in diameter, "
        "one earring standing upright slightly angled, the other laying flat, "
        "studio product shot with soft gradient reflection on surface"
    ),
    "tatum-band-ring.jpg": (
        "A modern stacked ring set featuring three thin bands in mixed metals, "
        "one rose gold with a tiny diamond pave, one yellow gold plain, "
        "one white gold with delicate milgrain texture, "
        "arranged in a row, slightly overlapping, macro detail shot"
    ),
    "friendship-bracelet.jpg": (
        "A slim chain bracelet with a minimalist round charm plate, "
        "in polished silver with yellow gold plating on the charm edge, "
        "laid flat in a gentle S-curve on a reflective surface, "
        "showing both the clasp detail and the charm face"
    ),
}

# 分类图 -> 新产品描述
CATEGORY_PROMPTS = {
    "necklaces.jpg": (
        "A delicate layered necklace set with two chains of different lengths, "
        "the shorter chain with a small bezel-set sapphire, "
        "the longer chain with a tiny geometric bar pendant in yellow gold, "
        "draped elegantly against a soft neutral background, "
        "showing the layering effect and clasp detail"
    ),
    "earrings.jpg": (
        "Modern sculptural drop earrings with a twisted wire design, "
        "in polished rose gold, hanging gracefully from French ear wires, "
        "soft focus background with subtle bokeh, "
        "both earrings visible side by side, slightly offset"
    ),
    "bracelets.jpg": (
        "A collection of three delicate beaded bracelets with small gold spacers, "
        "featuring semi-precious stones in soft pink and white tones, "
        "arranged in a parallel flat lay composition, "
        "warm natural light, gentle shadows on a linen surface"
    ),
    "rings.jpg": (
        "A sleek modern signet ring with an oval face in polished yellow gold, "
        "resting on a polished dark acrylic surface with mirror reflection, "
        "slightly angled view showing both the face and band profile, "
        "dramatic contrast lighting with hard specular highlights"
    ),
}

# Promo 图 -> 新产品描述
PROMO_PROMPTS = {
    "bestsellers.jpg": (
        "Editorial flat lay composition featuring an assortment of everyday fine jewelry, "
        "including a pendant necklace coiled gently, a pair of minimalist stud earrings, "
        "a thin bangle bracelet, and a petite stackable ring, "
        "all in mixed warm gold tones, arranged in a circular composition, "
        "soft natural window lighting from the side, warm cream linen background, "
        "lifestyle editorial jewelry photography, aspirational aesthetic, "
        "slightly desaturated with warm tone, elegant and effortless mood"
    ),
}

# ============================================================
# 核心逻辑
# ============================================================

# 创建 requests session，绕过系统代理（Windows 会从注册表读代理设置）
SESSION = requests.Session()
SESSION.headers.update({"api-key": AZURE_API_KEY, "Content-Type": "application/json"})
SESSION.trust_env = False  # 不读 HTTP_PROXY/HTTPS_PROXY 环境变量


def encode_image_to_base64(image_path: str) -> str:
    """读取图片并转换为 base64"""
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def analyze_image_style(image_path: str) -> Optional[str]:
    """
    使用 GPT-4o vision 分析图片的摄影风格
    返回：风格描述文本
    如果 VISION_DEPLOYMENT 没配置，返回 None
    """
    if not VISION_DEPLOYMENT:
        return None

    url = (
        f"{AZURE_ENDPOINT}/openai/deployments/{VISION_DEPLOYMENT}"
        f"/chat/completions?api-version={API_VERSION}"
    )

    b64_image = encode_image_to_base64(image_path)
    ext = Path(image_path).suffix[1:] or "jpeg"
    data_url = f"data:image/{ext};base64,{b64_image}"

    payload = {
        "messages": [
            {
                "role": "system",
                "content": (
                    "你是一个珠宝产品摄影专家。分析这张产品图的摄影风格，"
                    "用英文输出详细的风格描述，包括：\n"
                    "1. 光线类型（软光/硬光/侧光/顶光等）和光源方向\n"
                    "2. 背景和布景（颜色、材质、道具）\n"
                    "3. 拍摄角度和构图\n"
                    "4. 色调和色彩风格（暖/冷、饱和度、对比度）\n"
                    "5. 景深和焦距\n"
                    "6. 整体氛围和质感\n\n"
                    "只描述摄影风格，不要描述产品本身的设计细节。"
                ),
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {"url": data_url, "detail": "high"},
                    },
                    {"type": "text", "text": "分析这张珠宝图的摄影风格。"},
                ],
            },
        ],
        "max_tokens": 500,
    }

    resp = SESSION.post(url, json=payload, timeout=60)
    if resp.status_code != 200:
        print(f"  [警告] 视觉分析失败: {resp.status_code} {resp.text[:200]}")
        return None

    return resp.json()["choices"][0]["message"]["content"]


def generate_image(
    prompt: str,
    output_path: str,
) -> bool:
    """生成图片 - 产品描述 + 统一摄影风格"""
    final_prompt = f"{prompt}. {PHOTO_STYLE_SUFFIX}"

    url = (
        f"{AZURE_ENDPOINT}/openai/deployments/{IMAGE_DEPLOYMENT}"
        f"/images/generations?api-version={API_VERSION}"
    )

    payload = {
        "prompt": final_prompt,
        "n": 1,
        "size": IMAGE_SIZE,
        "quality": QUALITY,
    }

    # 重试机制，对付网络不稳定
    max_retries = 3
    for attempt in range(max_retries):
        try:
            print(f"  生成中 (尝试 {attempt+1}/{max_retries})...", end=" ", flush=True)
            resp = SESSION.post(url, json=payload, timeout=300)

            if resp.status_code == 429:
                wait = 30 * (attempt + 1)
                print(f"\n  ⏳ 429 限流，等待 {wait}s 后重试...")
                time.sleep(wait)
                continue

            if resp.status_code != 200:
                print(f"\n  [错误] 生成失败: {resp.status_code} {resp.text[:200]}")
                return False

            result = resp.json()

            # 保存图片
            saved = False
            for i, item in enumerate(result.get("data", [])):
                b64_data = item.get("b64_json")
                if b64_data:
                    img_data = base64.b64decode(b64_data)
                    save_path = output_path
                    if i > 0:
                        p = Path(output_path)
                        save_path = str(p.with_stem(f"{p.stem}_{i}"))
                    with open(save_path, "wb") as f:
                        f.write(img_data)
                    print(f"✓ 已保存: {save_path}")
                    saved = True

            if saved:
                return True
            print("  [警告] 响应中没有图片数据")
            return False

        except (requests.exceptions.Timeout, requests.exceptions.ConnectionError,
                requests.exceptions.ChunkedEncodingError) as e:
            print(f"⏳ 连接问题 ({type(e).__name__})，重试...")
            time.sleep(3)
            continue

    print("  [错误] 重试耗尽，生成失败")
    return False


def process_directory(name: str, prompt_map: dict, dir_path: Path):
    """处理一个目录下的所有图片"""
    if not dir_path.exists():
        print(f"[跳过] 目录不存在: {dir_path}")
        return

    # 使用 output 目录直接保存
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"\n{'='*60}")
    print(f"处理 {name} 目录 ({len(prompt_map)} 张图)")
    print(f"{'='*60}")

    for filename, product_desc in prompt_map.items():
        ref_path = dir_path / filename
        if not ref_path.exists():
            print(f"  [跳过] 参考图不存在: {ref_path}")
            continue

        # 生成输出文件名（加 name 前缀避免重名）
        stem = Path(filename).stem
        out_name = f"{name}_{stem}_generated.png"
        out_path = OUTPUT_DIR / out_name

        if out_path.exists():
            print(f"  [跳过] 已存在: {out_path}")
            continue

        print(f"\n  📷 参考: {filename}")
        print(f"  🆕 产品: {product_desc[:60]}...")

        # 生成新图片
        success = generate_image(
            prompt=product_desc,
            output_path=str(out_path),
        )

        if success:
            print(f"  ✅ 完成: {out_name}")
        else:
            print(f"  ❌ 失败: {filename}")

        # 避免 API 限流
        time.sleep(5)


def main():
    print("=" * 60)
    print("  珠宝产品图片生成脚本")
    print("=" * 60)

    # 验证 API 连接
    print("\n[验证] 测试 API 连接...", end=" ")
    test_prompt = "test"
    test_url = (
        f"{AZURE_ENDPOINT}/openai/deployments/{IMAGE_DEPLOYMENT}"
        f"/images/generations?api-version={API_VERSION}"
    )
    try:
        resp = SESSION.post(
            test_url,
            json={"prompt": test_prompt, "n": 1, "size": "1024x1024"},
            timeout=120,
        )
        if resp.status_code == 200 or resp.status_code == 429:
            print("✅" if resp.status_code == 200 else "⚠  (429 繁忙)")
            # 429 is OK - means endpoint is alive
        else:
            print(f"❌ {resp.status_code}: {resp.text[:100]}")
            print("请检查 API key 和 endpoint 配置")
            sys.exit(1)
    except requests.exceptions.Timeout:
        print("⚠  (超时-跳过测试)")
    except Exception as e:
        print(f"❌ {e}")
        sys.exit(1)

    # 创建输出目录
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # 处理各目录
    process_directory("products", PRODUCT_PROMPTS, PRODUCTS_DIR)
    process_directory("categories", CATEGORY_PROMPTS, CATEGORIES_DIR)
    process_directory("promo", PROMO_PROMPTS, PROMO_DIR)

    print(f"\n{'='*60}")
    print(f"  ✨ 全部完成！图片已保存到: {OUTPUT_DIR}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()

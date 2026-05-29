from PIL import Image, ImageColor
import os, math

BG = (245, 240, 235)  # #F5F0EB — lighter than before
SRC = r"D:\谷歌\新图"
PUBLIC = r"C:\Users\76750\mycode\ai-website-cloner\public\images"

def replace_white_bg(img, target_bg, threshold=220):
    img = img.convert("RGBA")
    w, h = img.size
    out = Image.new("RGBA", (w, h), target_bg + (255,))
    for y in range(h):
        for x in range(w):
            r, g, b, a = img.getpixel((x, y))
            if a == 0:
                continue
            dist = math.sqrt((255-r)**2 + (255-g)**2 + (255-b)**2)
            if dist > 40:
                out.putpixel((x, y), (r, g, b, 255))
            else:
                ratio = dist / 40
                out.putpixel((x, y), (
                    int(r * ratio + target_bg[0] * (1 - ratio)),
                    int(g * ratio + target_bg[1] * (1 - ratio)),
                    int(b * ratio + target_bg[2] * (1 - ratio)), 255))
    return out.convert("RGB")

def fit_in_canvas(img, canvas_w, canvas_h, bg_color):
    """Fit image inside canvas with 1/8 margins, maintaining aspect ratio."""
    canvas = Image.new("RGB", (canvas_w, canvas_h), bg_color)
    safe_w = canvas_w * 3 // 4  # 1/8 margin each side
    safe_h = canvas_h * 3 // 4
    img_w, img_h = img.size
    # Scale to fit within safe area
    scale = min(safe_w / img_w, safe_h / img_h)
    new_w = int(img_w * scale)
    new_h = int(img_h * scale)
    img_resized = img.resize((new_w, new_h), Image.LANCZOS)
    x = (canvas_w - new_w) // 2
    y = (canvas_h - new_h) // 2
    canvas.paste(img_resized, (x, y))
    return canvas

# ─── 1. Personalization banners — fit in 1920x640 with 1/8 margins ───
print("=== Personalization (fit in 1920x640, 1/8 margin) ===")
for src_name, dest_name in [
    ("birthstone.png", "birthstone.jpg"),
    ("charms.png", "charms.jpg"),
    ("engraving.png", "engraving.jpg"),
    ("initials.png", "initials.jpg"),
]:
    p = os.path.join(SRC, src_name)
    if not os.path.exists(p):
        print(f"  SKIP {src_name}")
        continue
    img = Image.open(p)
    canvas = fit_in_canvas(img, 1920, 640, BG)
    out = os.path.join(PUBLIC, "personalization", dest_name)
    canvas.save(out, "JPEG", quality=90, optimize=True, progressive=True)
    kb = os.path.getsize(out) // 1024
    print(f"  {dest_name:20s} 1920x640  {kb}KB")

# ─── 2. Product-only images — recolor to lighter BG ───
print()
print("=== Product images → bg #F5F0EB ===")

mappings = [
    # (dest, source)
    ("elisa-pendant.jpg", "necklace (3).png"),
    ("hoop-earrings.jpg", "earings.png"),              # NOW: actual earrings for e1!
    ("friendship-bracelet.jpg", "bracelet.png"),
    ("tatum-band-ring.jpg", "ring.png"),
    ("product-necklace.jpg", "necklace.png"),
    ("chatgpt-product.jpg", "ChatGPT Image 2026年5月28日 20_01_59.png"),
    ("vermeil-hoop-earrings.jpg", "necklace (2).png"), # NOW: pendant/shell necklace for d1
]

for dest_name, src_name in mappings:
    src_path = os.path.join(SRC, src_name)
    if not os.path.exists(src_path):
        print(f"  SKIP {dest_name} <- {src_name}")
        continue
    img = Image.open(src_path)
    img = img.resize((800, 800), Image.LANCZOS)
    img = replace_white_bg(img, BG)
    out = os.path.join(PUBLIC, "products", dest_name)
    img.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    kb = os.path.getsize(out) // 1024
    print(f"  {dest_name:30s} 800x800  {kb}KB")

print()
print("Done!")

from PIL import Image, ImageColor
import os, math

BG = (245, 240, 235)
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
    canvas = Image.new("RGB", (canvas_w, canvas_h), bg_color)
    safe_w = canvas_w * 3 // 4
    safe_h = canvas_h * 3 // 4
    img_w, img_h = img.size
    scale = min(safe_w / img_w, safe_h / img_h)
    new_w = int(img_w * scale)
    new_h = int(img_h * scale)
    img_resized = img.resize((new_w, new_h), Image.LANCZOS)
    x = (canvas_w - new_w) // 2
    y = (canvas_h - new_h) // 2
    canvas.paste(img_resized, (x, y))
    return canvas

def process_product(img, size=800):
    img = img.resize((size, size), Image.LANCZOS)
    return replace_white_bg(img, BG)

# ─── 1. Process new product-specific images ───
print("=== New product images ===")
new_products = [
    ("Amethyst Pendant Necklace.png", "amethyst-pendant.jpg"),
    ("Diamond Tennis Bracelet.png", "diamond-tennis-bracelet.jpg"),
    ("Friendship Bracelet Set.png", "friendship-bracelet.jpg"),
    ("Shell Pendant Necklace .png", "shell-pendant.jpg"),
    ("Tatum Band Ring.png", "tatum-band-ring.jpg"),
]

for src_name, dest_name in new_products:
    if dest_name is None:
        continue
    p = os.path.join(SRC, src_name)
    if not os.path.exists(p):
        print(f"  SKIP {src_name}")
        continue
    img = Image.open(p)
    w, h = img.size
    # Crop to square, then resize
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    img = img.crop((left, top, left + side, top + side))
    img = process_product(img)
    out = os.path.join(PUBLIC, "products", dest_name)
    img.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    kb = os.path.getsize(out) // 1024
    print(f"  {dest_name:30s} 800x800  {kb}KB")

# ─── 2. Process Elisa with Customer Photo necklace.png ───
print()
print("=== Elisa Pendant (model shot) ===")
elisa_src = os.path.join(SRC, "Customer Photo necklace.png")
if os.path.exists(elisa_src):
    img = Image.open(elisa_src)
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    img = img.crop((left, top, left + side, top + side))
    img = process_product(img)
    out = os.path.join(PUBLIC, "products", "elisa-pendant.jpg")
    img.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    kb = os.path.getsize(out) // 1024
    print(f"  elisa-pendant.jpg (model) 800x800  {kb}KB")

# ─── 3. Signature Chain gets a product-only image ───
print()
print("=== Signature Chain (product shot) ===")
# Use necklace (2).png as product-only image
sig_src = os.path.join(SRC, "necklace (2).png")
if os.path.exists(sig_src):
    img = Image.open(sig_src)
    img = img.resize((800, 800), Image.LANCZOS)
    img = replace_white_bg(img, BG)
    out = os.path.join(PUBLIC, "products", "signature-chain.jpg")
    img.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    kb = os.path.getsize(out) // 1024
    print(f"  signature-chain.jpg 800x800  {kb}KB")

print()
print("Done!")

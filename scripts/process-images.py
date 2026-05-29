"""Process source images: map, crop/resize, optimize, and place in public/images."""

import os, sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from PIL import Image

SRC_DIR = r"D:\谷歌\新图"
PUBLIC_IMAGES = r"C:\Users\76750\mycode\ai-website-cloner\public\images"

# === Source files ===
src_square = {
    "necklace.png": None,
    "necklace (2).png": None,
    "necklace (3).png": None,
    "earings.png": None,
    "bracelet.png": None,
    "ring.png": None,
}
src_portrait = {
    "Customer Photo.png": None,
    "Customer Photo (2).png": None,
    "Customer Photo (3).png": None,
    "Customer Photo (4).png": None,
}
src_hero_candidates = ["swana gems.png"]
src_promo_candidates = ["swana gems testimonial.png"]

# Verify all source files exist
for fn in list(src_square) + list(src_portrait) + src_hero_candidates + src_promo_candidates:
    path = os.path.join(SRC_DIR, fn)
    if not os.path.isfile(path):
        print(f"⚠  MISSING SOURCE: {fn}")
    else:
        print(f"[OK] {fn} ({os.path.getsize(path)//1024}KB)")

print()

# === Mapping: category images (square) ===
# Displayed at ~160px in slider, so 400x400 with good quality is plenty
CATEGORY_SIZE = (500, 500)
category_map = {
    "necklaces.jpg": "necklace.png",
    "earrings.jpg": "earings.png",
    "bracelets.jpg": "bracelet.png",
    "rings.jpg": "ring.png",
    "demi-fine.jpg": "necklace (2).png",
    "all.jpg": "necklace (3).png",
}

# === Mapping: product images (3:4 portrait) ===
# Product cards display at 3:4 aspect ratio
# Customer Photos are 1122x1402 — crop to exactly 3:4
PRODUCT_SIZE = (900, 1200)
product_map = {
    "elisa-pendant.jpg": "Customer Photo.png",
    "hoop-earrings.jpg": "Customer Photo (2).png",
    "friendship-bracelet.jpg": "Customer Photo (3).png",
    "tatum-band-ring.jpg": "Customer Photo (4).png",
    "diamond-tennis-bracelet.jpg": "bracelet.png",  # square → crop to 3:4
}

# === Hero image ===
HERO_SIZE = (1920, 960)  # 2:1 banner, enough for 1440px+ displays

# === Promo image ===
PROMO_SIZE = (800, 600)  # 4:3 promo card

# ============================================================

def crop_center(img, target_ratio):
    """Crop image from center to given aspect ratio (w/h)."""
    w, h = img.size
    current_ratio = w / h
    if abs(current_ratio - target_ratio) < 0.01:
        return img
    if current_ratio > target_ratio:
        # Too wide — crop width
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        return img.crop((left, 0, left + new_w, h))
    else:
        # Too tall — crop height
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        return img.crop((0, top, w, top + new_h))

def resize_fill(img, target_size):
    """Resize image to exactly fill target_size (w, h), cropping if needed."""
    tw, th = target_size
    # Crop to target aspect ratio first
    img = crop_center(img, tw / th)
    # Then resize
    return img.resize(target_size, Image.LANCZOS)

def save_optimized(img, output_path, quality=82):
    """Save as progressive JPEG with optimization."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    img.save(output_path, "JPEG", quality=quality, optimize=True, progressive=True)
    kb = os.path.getsize(output_path) // 1024
    return kb

# Clean up old AI-generated placeholders
gen_dir = os.path.join(PUBLIC_IMAGES, "products", "generated")
if os.path.isdir(gen_dir):
    import shutil
    shutil.rmtree(gen_dir)
    print("🧹  Removed old generated/ placeholders\n")

# === Process categories (square) ===
print("=" * 50)
print("📁  Categories (squares → 500x500)")
print("=" * 50)
for dest_name, src_name in category_map.items():
    src_path = os.path.join(SRC_DIR, src_name)
    if not os.path.isfile(src_path):
        print(f"  ✗  {dest_name}: source '{src_name}' not found — SKIP")
        continue
    img = Image.open(src_path)
    processed = resize_fill(img, CATEGORY_SIZE)
    dest = os.path.join(PUBLIC_IMAGES, "categories", dest_name)
    kb = save_optimized(processed, dest)
    print(f"  ✓  {dest_name:25s} ({src_name:20s}) → {CATEGORY_SIZE[0]}x{CATEGORY_SIZE[1]}  {kb}KB")

# === Process products (3:4 portrait) ===
print()
print("=" * 50)
print("📁  Products (3:4 portrait → 900x1200)")
print("=" * 50)
for dest_name, src_name in product_map.items():
    src_path = os.path.join(SRC_DIR, src_name)
    if not os.path.isfile(src_path):
        print(f"  ✗  {dest_name}: source '{src_name}' not found — SKIP")
        continue
    img = Image.open(src_path)
    processed = resize_fill(img, PRODUCT_SIZE)
    dest = os.path.join(PUBLIC_IMAGES, "products", dest_name)
    kb = save_optimized(processed, dest)
    print(f"  ✓  {dest_name:30s} ({src_name:22s}) → {PRODUCT_SIZE[0]}x{PRODUCT_SIZE[1]}  {kb}KB")

# === Process hero ===
print()
print("=" * 50)
print("📁  Hero banner (2:1 → 1920x960)")
print("=" * 50)
hero_src = src_hero_candidates[0]
src_path = os.path.join(SRC_DIR, hero_src)
if os.path.isfile(src_path):
    img = Image.open(src_path)
    processed = resize_fill(img, HERO_SIZE)
    dest = os.path.join(PUBLIC_IMAGES, "hero", "HeroBanner_d_2x.jpg")
    kb = save_optimized(processed, dest, quality=85)
    print(f"  ✓  HeroBanner_d_2x.jpg ({hero_src:20s}) → {HERO_SIZE[0]}x{HERO_SIZE[1]}  {kb}KB")
else:
    print(f"  ✗  Hero source '{hero_src}' not found — SKIP")

# === Process promo ===
print()
print("=" * 50)
print("📁  Promo (4:3 → 800x600)")
print("=" * 50)
promo_src = src_promo_candidates[0]
src_path = os.path.join(SRC_DIR, promo_src)
if os.path.isfile(src_path):
    img = Image.open(src_path)
    processed = resize_fill(img, PROMO_SIZE)
    dest = os.path.join(PUBLIC_IMAGES, "promo", "bestsellers.jpg")
    kb = save_optimized(processed, dest)
    print(f"  ✓  bestsellers.jpg ({promo_src:25s}) → {PROMO_SIZE[0]}x{PROMO_SIZE[1]}  {kb}KB")
else:
    print(f"  ✗  Promo source '{promo_src}' not found — SKIP")

# === Summary ===
print()
print("=" * 50)
print("✅  Done!")
print("=" * 50)

# List final sizes
print()
print("📊  Final sizes:")
for root, dirs, files in os.walk(PUBLIC_IMAGES):
    for f in sorted(files):
        if not f.endswith(('.jpg', '.jpeg', '.png', '.webp')):
            continue
        path = os.path.join(root, f)
        try:
            img = Image.open(path)
            rel = os.path.relpath(path, PUBLIC_IMAGES)
            kb = os.path.getsize(path) // 1024
            print(f"  {rel:50s} {img.size[0]}x{img.size[1]:>6s}  {kb:>4d}KB")
        except Exception as e:
            pass

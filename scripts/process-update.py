from PIL import Image
import os

SRC = r"D:\谷歌\新图"
DEST = r"C:\Users\76750\mycode\ai-website-cloner\public\images\products"

# Friendship Bracelet -> bracelet.png (product-only, no person)
img = Image.open(os.path.join(SRC, "bracelet.png"))
img = img.resize((800, 800), Image.LANCZOS)
out = os.path.join(DEST, "friendship-bracelet.jpg")
img.save(out, "JPEG", quality=85, optimize=True, progressive=True)
kb = os.path.getsize(out) // 1024
print(f"friendship-bracelet.jpg (no person) {kb}KB")

# New necklace.png as product-only shot
img = Image.open(os.path.join(SRC, "necklace.png"))
img = img.resize((800, 800), Image.LANCZOS)
out = os.path.join(DEST, "product-necklace.jpg")
img.save(out, "JPEG", quality=85, optimize=True, progressive=True)
kb = os.path.getsize(out) // 1024
print(f"product-necklace.jpg (new) {kb}KB")

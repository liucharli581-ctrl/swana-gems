from PIL import Image
import os, math

BG = (245, 240, 235)
SRC = r"D:\谷歌\新图"
DEST = r"C:\Users\76750\mycode\ai-website-cloner\public\images\products"

def replace_bg(img, bg=BG):
    img = img.convert("RGBA")
    w, h = img.size
    out = Image.new("RGBA", (w, h), bg + (255,))
    for y in range(h):
        for x in range(w):
            r, g, b, a = img.getpixel((x, y))
            if a == 0: continue
            d = math.sqrt((255-r)**2 + (255-g)**2 + (255-b)**2)
            if d > 40:
                out.putpixel((x, y), (r, g, b, 255))
            else:
                r2 = d / 40
                out.putpixel((x, y), (
                    int(r*r2 + bg[0]*(1-r2)),
                    int(g*r2 + bg[1]*(1-r2)),
                    int(b*r2 + bg[2]*(1-r2)), 255))
    return out.convert("RGB")

def crop_square(img):
    s = min(img.size)
    l = (img.size[0] - s) // 2
    t = (img.size[1] - s) // 2
    return img.crop((l, t, l + s, t + s))

# Format: (dest_name, src_main, src_hover)
# main = model shot (front), hover = product closeup (back)
pairs = [
    # Already have correct images - just add hover
    ("elisa-pendant.jpg",      "Elisa Pendant Necklace (2).png", "Elisa Pendant Necklace.png"),
    ("silver-bar-model.jpg",   "Silver Bar Pendant (2).png",     "Silver Bar Pendant.png"),
    ("gold-drop-model.jpg",    "Gold Drop Earrings (2).png",     "Gold Drop Earrings.png"),
    ("crystal-drop-model.jpg", "Crystal Drop Necklace (2).png",  "Crystal Drop Necklace.png"),
    # Already have model shots - add product hover from (2) versions
    ("amethyst-pendant.jpg",   None, "Amethyst Pendant Necklace (2).png"),
    ("diamond-tennis-bracelet.jpg", None, "Diamond Tennis Bracelet (2).png"),
    ("friendship-bracelet.jpg", None, "Friendship Bracelet Set (2).png"),
    ("tatum-band-ring.jpg",    None, "Tatum Band Ring (2).png"),
    ("shell-pendant.jpg",      None, "Shell Pendant Necklace (2).png"),
]

for main_name, main_src, hover_src in pairs:
    # Process main image if new source provided
    if main_src:
        p = os.path.join(SRC, main_src)
        if os.path.exists(p):
            img = Image.open(p)
            img = crop_square(img).resize((800, 800), Image.LANCZOS)
            if "necklace" in main_src or "pendant" in main_src or "earrings" in main_src:
                img = replace_bg(img)
            out = os.path.join(DEST, main_name)
            img.save(out, "JPEG", quality=88, optimize=True, progressive=True)
            print(f"  MAIN {main_name:30s} {os.path.getsize(out)//1024}KB")

    # Process hover image
    if hover_src:
        p = os.path.join(SRC, hover_src)
        if os.path.exists(p):
            img = Image.open(p)
            img = crop_square(img).resize((800, 800), Image.LANCZOS)
            img = replace_bg(img)
            hover_name = main_name.replace(".jpg", "-hover.jpg")
            out = os.path.join(DEST, hover_name)
            img.save(out, "JPEG", quality=88, optimize=True, progressive=True)
            print(f"  HOVER {hover_name:30s} {os.path.getsize(out)//1024}KB")

print()
print("Done!")

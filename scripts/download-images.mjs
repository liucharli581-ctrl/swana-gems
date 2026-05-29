import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const IMAGES = {
  "hero/HeroBanner_d_2x": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1779121440/homepage-imageuploader/2026/Summer/Weddings%20(Waves%201%20-%203)/HeroBanner_d_2x",
    ext: ".jpg",
  },
  "categories/necklaces": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1776219111/homepage-imageuploader/2026/Category%20Slider%20Library/elisa-pendant-necklace-ivory-mop_2",
    ext: ".jpg",
  },
  "categories/earrings": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1779765178/homepage-imageuploader/2026/Category%20Slider%20Library/Screenshot_2026-05-25_at_10.12.48_PM",
    ext: ".jpg",
  },
  "categories/bracelets": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1775683926/homepage-imageuploader/2026/Category%20Slider%20Library/imgx4_bracelets",
    ext: ".jpg",
  },
  "categories/rings": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1778101984/homepage-imageuploader/2026/Category%20Slider%20Library/tatum-band-ring-silver",
    ext: ".jpg",
  },
  "categories/watches": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1779507467/homepage-imageuploader/2026/Category%20Slider%20Library/watches",
    ext: ".jpg",
  },
  "categories/demi-fine": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1778199708/homepage-imageuploader/2026/Summer/Summer%201%20and%20Personalization/FINAL/parker",
    ext: ".jpg",
  },
  "categories/fine-jewelry": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1778200922/homepage-imageuploader/2026/Summer/Summer%201%20and%20Personalization/bestsellers_imgx2_d",
    ext: ".jpg",
  },
  "categories/mens": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1778201003/homepage-imageuploader/2026/Summer/Summer%201%20and%20Personalization/sunglasses_imgx2_d",
    ext: ".jpg",
  },
  "categories/all": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1778200922/homepage-imageuploader/2026/Summer/Summer%201%20and%20Personalization/bestsellers_imgx2_d",
    ext: ".jpg",
  },
  "products/elisa-pendant": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1776219111/homepage-imageuploader/2026/Category%20Slider%20Library/elisa-pendant-necklace-ivory-mop_2",
    ext: ".jpg",
  },
  "products/tatum-band-ring": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1778101984/homepage-imageuploader/2026/Category%20Slider%20Library/tatum-band-ring-silver",
    ext: ".jpg",
  },
  "products/hoop-earrings": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1779765178/homepage-imageuploader/2026/Category%20Slider%20Library/Screenshot_2026-05-25_at_10.12.48_PM",
    ext: ".jpg",
  },
  "products/friendship-bracelet": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1775683926/homepage-imageuploader/2026/Category%20Slider%20Library/imgx4_bracelets",
    ext: ".jpg",
  },
  "products/luxe-watch": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1779507467/homepage-imageuploader/2026/Category%20Slider%20Library/watches",
    ext: ".jpg",
  },
  "products/diamond-tennis-bracelet": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1778201003/homepage-imageuploader/2026/Summer/Summer%201%20and%20Personalization/sunglasses_imgx2_d",
    ext: ".jpg",
  },
  "promo/bestsellers": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1778200922/homepage-imageuploader/2026/Summer/Summer%201%20and%20Personalization/bestsellers_imgx2_d",
    ext: ".jpg",
  },
  "promo/sunglasses": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1778201003/homepage-imageuploader/2026/Summer/Summer%201%20and%20Personalization/sunglasses_imgx2_d",
    ext: ".jpg",
  },
  "personalization/birthstone": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1771296294/yellow-rose/GALLERY/2026-Spring/FINAL/SCREEN/KS26-YR-SPRING-1100",
    ext: ".jpg",
  },
  "personalization/charms": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1778199708/homepage-imageuploader/2026/Summer/Summer%201%20and%20Personalization/FINAL/parker",
    ext: ".jpg",
  },
  "personalization/engraving": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1774392261/homepage-imageuploader/2026/Evergreen/imagextext_kendra",
    ext: ".jpg",
  },
  "personalization/initials": {
    url: "https://res.cloudinary.com/kendra-scott/image/upload/f_auto/q_auto/v1778200922/homepage-imageuploader/2026/Summer/Summer%201%20and%20Personalization/bestsellers_imgx2_d",
    ext: ".jpg",
  },
};

const BASE_DIR = join(import.meta.dirname, "..", "public", "images");

async function downloadImage(key, { url, ext }) {
  const filePath = join(BASE_DIR, key + ext);
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      console.error(`  FAIL [${resp.status}] ${key}`);
      return false;
    }
    const buf = Buffer.from(await resp.arrayBuffer());
    writeFileSync(filePath, buf);
    console.log(`  OK   ${key}${ext} (${(buf.length / 1024).toFixed(0)} KB)`);
    return true;
  } catch (err) {
    console.error(`  FAIL ${key}: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log("Downloading images from Cloudinary...\n");
  const entries = Object.entries(IMAGES);
  let success = 0;
  for (const [key, info] of entries) {
    // ensure subdirectory exists
    const dir = join(BASE_DIR, key.split("/").slice(0, -1).join("/"));
    mkdirSync(dir, { recursive: true });
    if (await downloadImage(key, info)) success++;
  }
  console.log(`\nDone: ${success}/${entries.length} images downloaded.`);
}

main();

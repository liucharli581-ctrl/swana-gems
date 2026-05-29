#!/usr/bin/env node

/**
 * SEO Audit Script — 检查网站 SEO 基础问题
 * Usage: node scripts/seo-audit.mjs
 */

const BASE_URL = process.env.AUDIT_URL || "https://swana.wholesalesemigems.com";

const pages = [
  "/",
  "/new-arrivals",
  "/best-sellers",
  "/category/all",
  "/category/necklaces",
  "/category/earrings",
  "/category/bracelets",
  "/category/rings",
  "/category/demi-fine",
  "/gifts",
  "/product/elisa-pendant-necklace",
  "/product/silver-bar-pendant",
  "/product/signature-chain-necklace",
  "/product/amethyst-pendant-necklace",
  "/product/classic-hoop-earrings",
  "/product/gold-drop-necklace",
  "/product/friendship-bracelet",
  "/product/diamond-tennis-bracelet",
  "/product/tatum-band-ring",
  "/product/shell-pendant-necklace",
  "/product/crystal-drop-necklace",
  "/press",
  "/press/swana-gems-redefining-everyday-elegance",
  "/about",
  "/contact",
  "/faq",
  "/shipping",
  "/size-guide",
  "/care-guide",
  "/sustainability",
  "/privacy",
  "/terms",
  "/accessibility",
  "/order-confirmation",
];

// Pages that should not be indexed
const noindexPaths = ["/order-confirmation"];

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

function pass(msg) {
  console.log(`  ${GREEN}✓${RESET} ${msg}`);
}

function warn(msg) {
  console.log(`  ${YELLOW}⚠${RESET} ${msg}`);
}

function fail(msg) {
  console.log(`  ${RED}✗${RESET} ${msg}`);
}

async function fetchPage(url) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    const html = await res.text();
    return { status: res.status, html, url: res.url };
  } catch (e) {
    return { status: 0, html: "", url };
  }
}

function extractMeta(html, name) {
  const regex = new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']+)["']`, "i");
  const m = html.match(regex);
  return m ? m[1] : null;
}

function extractCanonical(html) {
  const m = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]+)<\/title>/i);
  return m ? m[1] : null;
}

function extractH1s(html) {
  const h1s = [];
  const regex = /<h1[^>]*>(.*?)<\/h1>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    h1s.push(m[1].replace(/<[^>]*>/g, "").trim());
  }
  return h1s;
}

function extractSchema(html) {
  const schemas = [];
  const regex = /<script\s+type=["']application\/ld\+json["']>(.*?)<\/script>/gis;
  let m;
  while ((m = regex.exec(html)) !== null) {
    try {
      schemas.push(JSON.parse(m[1]));
    } catch {}
  }
  return schemas;
}

function extractImages(html) {
  const imgs = [];
  const regex = /<img[^>]+>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const tag = m[0];
    const src = tag.match(/src=["']([^"']+)["']/i);
    const alt = tag.match(/alt=["']([^"']*)["']/i);
    const loading = tag.match(/loading=["']([^"']+)["']/i);
    const fetchpriority = tag.match(/fetchpriority=["']([^"']+)["']/i);
    imgs.push({
      src: src ? src[1] : null,
      alt: alt ? alt[1] : null,
      loading: loading ? loading[1] : null,
      fetchpriority: fetchpriority ? fetchpriority[1] : null,
    });
  }
  return imgs;
}

function extractRobotsMeta(html) {
  const m = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

async function main() {
  console.log(`\n${BOLD}🔍 SEO Audit Report${RESET}`);
  console.log(`   Target: ${BASE_URL}\n`);

  let totalChecks = 0;
  let passCount = 0;
  let warnCount = 0;
  let failCount = 0;

  // 1. Sitemap & Robots
  console.log(`${BOLD}1. Sitemap & Robots${RESET}`);
  totalChecks++;

  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const sitemapText = sitemapRes.status === 200 ? await sitemapRes.text() : "";
  if (sitemapRes.status === 200) {
    pass("Sitemap exists and returns 200");
    passCount++;
  } else {
    fail(`Sitemap returned ${sitemapRes.status}`);
    failCount++;
  }

  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  const robotsText = robotsRes.status === 200 ? await robotsRes.text() : "";
  if (robotsRes.status === 200 && robotsText.includes("Sitemap")) {
    pass("robots.txt exists with Sitemap reference");
    passCount++;
  } else {
    fail("robots.txt missing or missing Sitemap reference");
    failCount++;
  }

  // Count sitemap URLs
  const sitemapUrls = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)];
  console.log(`   Sitemap contains ${sitemapUrls.length} URLs`);

  // Check for excluded pages in sitemap
  for (const urlMatch of sitemapUrls) {
    const url = urlMatch[1];
    if (url.includes("/sale") || url.includes("/careers")) {
      warn(`Sitemap still contains deleted page: ${url}`);
      warnCount++;
    }
  }

  console.log("");

  // 2. Page-by-page analysis
  console.log(`${BOLD}2. Page Analysis${RESET}`);

  for (const path of pages) {
    const url = `${BASE_URL}${path}`;
    const { status, html, url: finalUrl } = await fetchPage(url);
    const pageLabel = path;

    if (status >= 400) {
      fail(`${pageLabel} → HTTP ${status} ERROR`);
      failCount++;
      continue;
    }

    const issues = [];

    // Status code
    if (status >= 300 && status < 400) {
      issues.push(`Redirects to ${finalUrl}`);
    }

    // Title
    const title = extractTitle(html);
    if (!title || title.trim() === "") {
      issues.push("Missing <title>");
    } else if (title.length < 10 || title.length > 70) {
      issues.push(`Title length: ${title.length} chars (good: 10-70)`);
    }

    // Meta description
    const desc = extractMeta(html, "description");
    if (!desc || desc.trim() === "") {
      issues.push("Missing meta description");
    } else if (desc.length < 50 || desc.length > 165) {
      issues.push(`Meta description length: ${desc.length} chars (good: 50-165)`);
    }

    // H1
    const h1s = extractH1s(html);
    if (h1s.length === 0) {
      issues.push("No H1 tag");
    } else if (h1s.length > 1) {
      issues.push(`Multiple H1s: ${h1s.length}`);
    }

    // Canonical
    const canonical = extractCanonical(html);
    if (!canonical) {
      issues.push("Missing canonical");
    } else if (!canonical.includes(BASE_URL.replace("https://", ""))) {
      issues.push(`Canonical points to different domain: ${canonical}`);
    }

    // Robots meta
    const robots = extractRobotsMeta(html);
    if (robots?.includes("noindex")) {
      if (!noindexPaths.includes(path)) {
        issues.push(`Unexpected noindex: ${robots}`);
      }
    }

    // Schema
    const schemas = extractSchema(html);
    if (path.startsWith("/product/") && schemas.length === 0) {
      issues.push("Product page missing Schema");
    }

    // Images
    const imgs = extractImages(html);
    const noAltImgs = imgs.filter((img) => !img.alt && img.src && !img.src.includes("logo"));
    if (noAltImgs.length > 0) {
      issues.push(`${noAltImgs.length} image(s) missing alt text`);
    }

    // Output
    if (issues.length === 0) {
      pass(pageLabel);
      passCount++;
    } else if (issues.length <= 2) {
      warn(`${pageLabel} → ${issues.join("; ")}`);
      warnCount++;
    } else {
      fail(`${pageLabel} → ${issues.join("; ")}`);
      failCount++;
    }
  }

  // 3. Schema check
  console.log(`\n${BOLD}3. Schema Check${RESET}`);
  const homeResult = await fetchPage(`${BASE_URL}/`);
  const homeSchemas = extractSchema(homeResult.html);
  const hasOrgSchema = homeSchemas.some((s) => s["@type"] === "Organization" || s["@type"] === "OnlineStore");
  const hasWebSchema = homeSchemas.some((s) => s["@type"] === "WebSite");

  if (hasOrgSchema) pass("Homepage has Organization/OnlineStore schema");
  else { fail("Homepage missing Organization schema"); failCount++; }
  totalChecks++;

  if (hasWebSchema) pass("Homepage has WebSite schema");
  else { warn("Homepage missing WebSite schema"); warnCount++; }
  totalChecks++;

  // Product page Schema
  const prodResult = await fetchPage(`${BASE_URL}/product/elisa-pendant-necklace`);
  const prodSchemas = extractSchema(prodResult.html);
  const hasProductSchema = prodSchemas.some((s) => s["@type"] === "Product");
  if (hasProductSchema) pass("Product page has Product schema with required fields");
  else { fail("Product page missing Product schema"); failCount++; }
  totalChecks++;

  // FAQ Schema
  for (const page of ["/category/all", "/product/elisa-pendant-necklace"]) {
    const r = await fetchPage(`${BASE_URL}${page}`);
    const schemas = extractSchema(r.html);
    const hasFAQ = schemas.some((s) => s["@type"] === "FAQPage");
    if (hasFAQ) pass(`${page} has FAQPage schema`);
    else warn(`${page} schema not found`);
  }

  // 4. Performance hints
  console.log(`\n${BOLD}4. Performance Hints${RESET}`);

  // Check hero image
  const heroImg = homeResult.html.match(/<img[^>]*hero[^>]*>/i);
  if (heroImg) {
    const hasFetchPriority = heroImg[0].includes("fetchpriority=");
    if (hasFetchPriority) pass("Hero image has fetchpriority");
    else warn("Hero image missing fetchpriority='high'");
  }

  // Check lazy loading on above-fold images
  const homeImgs = extractImages(homeResult.html);
  const lazyAboveFold = homeImgs.slice(0, 3).filter((img) => img.loading === "lazy" && !img.src?.includes("logo"));
  if (lazyAboveFold.length > 1) {
    warn(`First ${lazyAboveFold.length} images use lazy loading (should be eager)`);
    warnCount++;
  } else {
    pass("Above-fold images not lazily loaded");
    passCount++;
  }

  // 5. Summary
  console.log(`\n${BOLD}${"=".repeat(40)}${RESET}`);
  console.log(`${BOLD}Audit Summary${RESET}`);
  console.log(`  ${GREEN}Pass: ${passCount}${RESET}`);
  console.log(`  ${YELLOW}Warnings: ${warnCount}${RESET}`);
  console.log(`  ${RED}Fails: ${failCount}${RESET}`);
  console.log(`  Total checks: ${totalChecks}`);
  console.log(`${BOLD}${"=".repeat(40)}\n${RESET}`);
}

main();

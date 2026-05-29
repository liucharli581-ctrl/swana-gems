"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

interface HeroSlide {
  type: "image" | "video";
  src: string;
  alt?: string;
  pretitle?: string;
  title: string;
  titleItalic?: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  cta2Text?: string;
  cta2Href?: string;
}

const slides: HeroSlide[] = [
  {
    type: "image",
    src: "/images/hero/HeroBanner_d_2x.jpg",
    pretitle: "Summer 2026 Collection",
    title: "Jewelry for",
    titleItalic: "Everyday Moments",
    description: "Handcrafted pieces designed to be worn, layered, and loved — from morning coffee to evening out.",
    ctaText: "Shop Now",
    ctaHref: "/category/all",
    cta2Text: "New Arrivals",
    cta2Href: "/new-arrivals",
  },
  {
    type: "video",
    src: "/videos/hero-banner.mp4",
    pretitle: "The Art of Adornment",
    title: "Find Your",
    titleItalic: "Signature Style",
    description: "Explore our curated collection and discover pieces that speak to you.",
    ctaText: "Explore Collection",
    ctaHref: "/category/all",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const touchRef = useRef<{ startX: number }>({ startX: 0 });

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchRef.current.startX = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchRef.current.startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
  }, [goNext, goPrev]);

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <section
      className="relative w-full h-[80vh] lg:h-screen overflow-hidden bg-[#0a0a0a]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === current
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          {/* Media */}
          {slide.type === "image" ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.src})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-[#2a2826] flex items-center justify-center">
              {slide.src ? (
                <video
                  src={slide.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 border-2 border-white/30 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                  </div>
                  <p className="text-sm text-white/40 tracking-wide">Add your video here</p>
                </div>
              )}
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-black/10" />

          {/* Content */}
          <div className="absolute inset-0 flex items-end lg:items-center">
            <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 pb-16 lg:pb-20 lg:pt-0">
              <div className="max-w-xl">
                {slide.pretitle && (
                  <p className="text-xs tracking-[0.2em] uppercase text-white/60 mb-4">
                    {slide.pretitle}
                  </p>
                )}
                {index === 0 ? (
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-tight mb-5">
                    {slide.title}
                    {slide.titleItalic && (
                      <>
                        <br />
                        <span className="italic">{slide.titleItalic}</span>
                      </>
                    )}
                  </h1>
                ) : (
                  <div className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-tight mb-5">
                    {slide.title}
                    {slide.titleItalic && (
                      <>
                        <br />
                        <span className="italic">{slide.titleItalic}</span>
                      </>
                    )}
                  </div>
                )}
                <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Link
                    href={slide.ctaHref}
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#0a0a0a] text-sm tracking-[0.1em] uppercase font-medium hover:bg-white/90 transition-colors"
                  >
                    {slide.ctaText}
                  </Link>
                  {slide.cta2Text && slide.cta2Href && (
                    <Link
                      href={slide.cta2Href}
                      className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 text-white text-sm tracking-[0.1em] uppercase hover:bg-white/10 transition-colors"
                    >
                      {slide.cta2Text}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`transition-all duration-500 ${
              index === current
                ? "w-10 h-[2px] bg-white"
                : "w-4 h-[2px] bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={goPrev}
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center hover:bg-white/10 transition-colors z-10"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={goNext}
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center hover:bg-white/10 transition-colors z-10"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
        </svg>
      </button>
    </section>
  );
}

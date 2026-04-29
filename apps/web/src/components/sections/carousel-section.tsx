"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";
import { stegaClean } from "@sanity/client/stega";

type CarouselSectionProps = PagebuilderType<"carouselSection">;

export function CarouselSection({ title, subtitle, slides }: CarouselSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeSlides = slides || [];
  const slideLength = safeSlides.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slideLength);
  }, [slideLength]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slideLength) % slideLength);
  }, [slideLength]);

  // Auto-play interval
  useEffect(() => {
    if (slideLength <= 1) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [handleNext, slideLength, currentIndex]); // depend on currentIndex to reset timer on manual click

  if (slideLength === 0) {
    return (
      <section className="bg-transparent py-20 md:py-28 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center text-slate-500">
          No slides added yet.
        </div>
      </section>
    );
  }

  // Get the current, previous, and next slide indices safely
  const getIndex = (offset: number) => {
    return (currentIndex + offset + slideLength) % slideLength;
  };

  return (
    <section className="bg-transparent py-20 md:py-28 relative overflow-hidden flex flex-col items-center">
      
      {/* Section Heading */}
      {(title || subtitle) && (
        <div className="container mx-auto px-4 md:px-6 mb-14 max-w-5xl text-center">
          {title && (
            <h2 className="font-bold text-4xl text-white leading-tight tracking-tight md:text-5xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-4 text-slate-400 text-base leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="relative w-full">
        {/* Main Display - Flat Looping Carousel */}
        <div 
          className="relative h-[450px] md:h-[650px] w-full flex items-center justify-center py-8 md:py-12"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          }}
        >
            
            {safeSlides.map((slide, index) => {
              // Calculate shortest distance in a circular array
              let distance = index - currentIndex;
              if (distance > slideLength / 2) distance -= slideLength;
              if (distance < -slideLength / 2) distance += slideLength;

              // Hide items that are too far away to optimize rendering
              const isVisible = Math.abs(distance) <= 1;

              // Position horizontally
              // distance = 0 -> center
              // 110% offset adds a nice 10% gap between slides
              const x = `${distance * 110}%`;
              const opacity = distance === 0 ? 1 : 0.4;
              const zIndex = distance === 0 ? 20 : 10;
              const scale = distance === 0 ? 1 : 0.9;

              return (
                <motion.div
                data-sanity="ignore"
                  key={slide._key || index}
                  animate={{
                    x,
                    opacity,
                    zIndex,
                    scale,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className={`absolute flex flex-col items-center justify-center w-[80vw] md:w-[60vw] max-w-5xl ${
                    !isVisible ? "hidden" : ""
                  }`}
                >
                  {slide?.image ? (
                    <div className="relative h-full w-full max-h-[350px] md:max-h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                      <SanityImage
                        image={slide.image as any}
                        className="object-contain h-full w-full rounded-3xl"
                        width={1400}
                        height={900}
                      />
                    </div>
                  ) : (
                    <div className="text-slate-500 h-[300px] flex items-center justify-center border border-white/10 rounded-2xl w-full">
                      No slide image added.
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Controls */}
            {slideLength > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#161b2e]/80 backdrop-blur-md text-slate-400 transition hover:bg-[#1e2540] hover:text-white hover:scale-110 active:scale-95 shadow-xl"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#161b2e]/80 backdrop-blur-md text-slate-400 transition hover:bg-[#1e2540] hover:text-white hover:scale-110 active:scale-95 shadow-xl"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Text Content for current slide */}
          <div className="container mx-auto mt-8 min-h-[100px] px-4 md:px-6 flex justify-center">
            <AnimatePresence mode="wait">
              {safeSlides[currentIndex] && (
                <motion.div
                  key={`text-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-3xl text-left"
                >
                  {safeSlides[currentIndex].title && (
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      {stegaClean(safeSlides[currentIndex].title)}
                    </h3>
                  )}
                  {safeSlides[currentIndex].subtitle && (
                    <p className="mt-3 text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">
                      {stegaClean(safeSlides[currentIndex].subtitle)}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
    </section>
  );
}

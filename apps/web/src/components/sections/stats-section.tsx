"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type StatsSectionProps = PagebuilderType<"statsSection">;
type Stat = NonNullable<StatsSectionProps["stats"]>[number];





export function StatsSection({ title, subtitle, stats }: StatsSectionProps) {
  const { ref, isInView } = useScrollReveal();
  if (!stats || stats.length === 0) return null;

  // Split into 3 columns
  const columns: Stat[][] = [[], [], []];
  stats.forEach((stat, i) => {
    if (stat) columns[i % 3]!.push(stat);
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-vertical-reverse {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-marquee {
          animation: marquee-vertical 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-vertical-reverse 30s linear infinite;
        }
      `}} />
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      data-sanity="ignore"
      className="bg-transparent pb-20 md:pb-28"
      id="stats-section"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="bg-[#14133E] border-l border-r border-b border-white/10 py-16 px-4 md:px-10">
        
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-5xl text-center">
          {title && (
            <h2 className="font-semibold text-2xl md:text-5xl leading-tight tracking-tight 
  bg-gradient-to-r from-white to-gray-500 
  bg-clip-text text-transparent">
  {title}
</h2>
          )}
          {subtitle && (
            <p className="mt-4 text-slate-200 text-base leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
          {columns.map((col, colIndex) => {
            const isReverse = colIndex === 1;

            return (
              <div key={colIndex} className={`relative h-[600px] overflow-hidden ${colIndex > 0 ? "hidden md:block" : ""}`}>
                
                {/* Animated column */}
                <div
                  data-sanity="ignore"
                  className={`flex flex-col gap-6 ${isReverse ? "animate-marquee-reverse" : "animate-marquee"}`}
                >
                  {[...col, ...col].map((stat, index) => {
                    const heightClass = "h-[260px] md:h-[260px]";

                    return (
                      <div
                        key={`${stat._key}-${index}`}
                        className={`
                          relative flex flex-col justify-between
                          rounded-2xl p-7 ${heightClass}

                          
                          bg-gradient-to-b from-white/[0.06] to-white/[0.02]
                          backdrop-blur-2xl

                          
                          border border-white/10

                          transition duration-300
                          hover:from-white/[0.08]
                          hover:to-white/[0.04]
                          hover:border-white/20
                        `}
                      >
                        {/* Logo */}
                        {stat.logo?.id && (
                          <div className="mb-5 flex items-center">
  <div className="relative h-8 w-full max-w-[120px]">
    <SanityImage
      image={stat.logo as any}
      width={120}
      height={40}
      className="!relative !h-full !w-full !object-contain"
    />
  </div>
</div>
                        )}

                        {/* Content */}
                        <div className="mt-auto">
                          <p className="font-semibold text-2xl md:text-4xl text-white leading-none tracking-tight">
                            {stat.value}
                          </p>
                          <p className="mt-2 text-slate-400 text-sm leading-snug">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Fade masks */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#14133E] to-transparent z-10" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#14133E] to-transparent z-10" />
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </motion.section>
    </>
  );
}
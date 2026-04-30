"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type FeatureGridProps = PagebuilderType<"featureGrid">;

export function FeatureGrid({ title, features }: FeatureGridProps) {
  const { ref, isInView } = useScrollReveal();
  if (!features?.length) return null;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-transparent py-20 md:py-28"
      id="feature-grid"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section heading */}
        {title && (
          <h2 className="mx-auto max-w-3xl text-balance text-center font-semibold text-2xl md:text-[38px] text-white tracking-tight leading-[45.9px]">
            {title}
          </h2>
        )}

        {/* Feature cards grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {features.map((feature, index) => (
            <article
              className="group flex flex-col overflow-hidden border border-white/10 bg-[#161b2e] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-white/20 hover:bg-[#1e2540] hover:shadow-2xl hover:shadow-indigo-500/10 animate-in fade-in slide-in-from-bottom-4 duration-1000"
              style={{ animationFillMode: "both", animationDelay: `${index * 150}ms` }}
              key={feature._key}
            >
              {/* Text content */}
              <div className="flex flex-col gap-3 p-8">
                {feature.eyebrow && (
                  <span className="font-medium text-slate-500 text-xs tracking-widest uppercase">
                    {feature.eyebrow}
                  </span>
                )}
                {feature.title && (
                  <h3 className="font-semibold text-white text-xl md:text-[25px] leading-[25.5px]">
                    {feature.title}
                  </h3>
                )}
                {feature.description && (
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                )}
              </div>

              {/* Feature image — full width at bottom */}
              {feature.image && (
                <div className="relative mt-auto overflow-hidden">
                  {/* Gradient overlay at the top of the image */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-[#161b2e] to-transparent group-hover:from-[#1e2540]"
                  />
                  <SanityImage
                    className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    height={400}
                    image={feature.image}
                    width={700}
                  />
                </div>
              )}

              {/* Learn More footer */}
              <div className="flex justify-end border-white/10 border-t px-8 py-5">
                <span className="inline-flex items-center gap-1 font-medium text-indigo-400 text-sm transition-colors hover:text-indigo-300">
                  Learn More
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

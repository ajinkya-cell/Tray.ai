import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

import type { PagebuilderType } from "@/types";
import { SanityButtons } from "../elements/sanity-buttons";
import { SanityImage } from "../elements/sanity-image";

type HeroSectionProps = PagebuilderType<"heroSection">;

export function HeroSection({
  heading,
  subheading,
  buttons,
  image,
}: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-transparent py-20 md:py-28"
      id="hero"
    >
      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
      />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — text content */}
          <div className="flex flex-col gap-6 lg:max-w-xl">
            <h1 className="text-balance font-bold text-4xl text-white leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              {heading}
            </h1>

            {subheading && (
              <p className="max-w-md text-lg text-slate-400 leading-relaxed">
                {subheading}
              </p>
            )}

            {buttons && buttons.length > 0 && (
              <SanityButtons
                buttonClassName={cn(
                  "rounded-full px-7 py-3 font-medium transition-all",
                  "first:bg-indigo-600 first:text-white first:hover:bg-indigo-500",
                  "last:border last:border-white/20 last:bg-transparent last:text-white last:hover:bg-white/10"
                )}
                buttons={buttons as Parameters<typeof SanityButtons>[0]["buttons"]}
                className="flex flex-wrap gap-3"
              />
            )}
          </div>

          {/* Right — floating product UI panel */}
          {image && (
            <div className="relative flex items-center justify-center lg:justify-end">
              {/* Glow effect */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl bg-indigo-600/20 blur-3xl"
              />
              <div className="relative w-full max-w-2xl">
                <SanityImage
                  className="w-full rounded-2xl border border-white/10 shadow-2xl"
                  fetchPriority="high"
                  height={600}
                  image={image}
                  loading="eager"
                  width={900}
                />
                {/* Purple gradient overlay at bottom of image */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 rounded-b-2xl bg-gradient-to-t from-indigo-950/60 to-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

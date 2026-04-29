import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";

type LogoStripProps = PagebuilderType<"logoStrip">;

export function LogoStrip({ logos }: LogoStripProps) {
  if (!logos?.length) return null;

  // Duplicate logos enough times to ensure smooth scrolling even on ultra-wide screens
  const duplicatedLogos = Array.from({ length: 8 }).flatMap(() => logos);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-horizontal-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-horizontal {
          animation: marquee-horizontal-reverse 60s linear infinite;
        }
        .animate-marquee-horizontal:hover {
          animation-play-state: paused;
        }
      `}} />
      <section
        className="relative bg-transparent py-8"
        id="logo-strip"
      >
        <div className="container mx-auto max-w-7xl relative overflow-hidden">
          {/* Fade edges */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0F172B] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-30 bg-gradient-to-l from-[#0F172B] to-transparent"
          />

          <div className="flex">
            <ul
              aria-label="Partner logos"
              className="flex min-w-max items-center gap-12 px-8 animate-marquee-horizontal"
            >
              {duplicatedLogos.map((logo, i) => (
                <li
                  className="flex shrink-0 items-center opacity-70 transition-opacity duration-400 hover:opacity-100"
                  key={`${logo.id}-${i}`}
                >
                  <SanityImage
                    className="h-6 w-auto max-w-[100px] object-contain"
                    height={24}
                    image={logo}
                    width={100}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

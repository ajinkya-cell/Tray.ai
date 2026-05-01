import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";

type LogoStripProps = PagebuilderType<"logoStrip">;

export function LogoStrip({ logos }: LogoStripProps) {
  if (!logos?.length) return null;

  // Duplicate logos enough times to ensure smooth scrolling even on ultra-wide screens
  const duplicatedLogos = Array.from({ length: 6 }).flatMap(() => logos);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-horizontal-reverse {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-horizontal {
            animation: none !important;
          }
        }
        .animate-marquee-horizontal {
          animation: marquee-horizontal-reverse 60s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          perspective: 1000px;
          -webkit-perspective: 1000px;
        }
        @media (max-width: 768px) {
          .animate-marquee-horizontal {
            animation-duration: 40s;
          }
        }
        @media (hover: hover) {
          .animate-marquee-horizontal:hover {
            animation-play-state: paused;
          }
        }
      `}} />
      <section
        className="relative bg-transparent py-6 sm:py-8"
        id="logo-strip"
      >
        <div className="container mx-auto max-w-7xl relative overflow-hidden">
          {/* Fade edges */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 bg-gradient-to-r from-[#0F172B] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-30 bg-gradient-to-l from-[#0F172B] to-transparent"
          />

          <div className="flex">
            <ul
              aria-label="Partner logos"
              className="flex min-w-max items-center gap-6 sm:gap-12 px-4 sm:px-8 animate-marquee-horizontal"
            >
              {duplicatedLogos.map((logo, i) => (
                <li
                  className="flex shrink-0 items-center opacity-70 transition-opacity duration-300 hover:opacity-100"
                  key={`${logo.id}-${i}`}
                >
                 <div className="scale-75 sm:scale-90">
                   <SanityImage
                    className="h-5 sm:h-6 w-auto max-w-[80px] sm:max-w-[100px] object-contain"
                    height={24}
                    image={logo}
                    width={100}
                  />
                 </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

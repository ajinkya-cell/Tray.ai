import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";

type LogoStripProps = PagebuilderType<"logoStrip">;

export function LogoStrip({ logos }: LogoStripProps) {
  if (!logos?.length) return null;

  // Duplicate once for truly seamless infinite loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <>
       <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-horizontal {
            animation: none !important;
          }
        }
        .marquee-track {
          min-width: max-content;
        }
        .animate-marquee-horizontal {
          animation: marquee-scroll 30s linear infinite;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        @media (max-width: 768px) {
          .animate-marquee-horizontal {
            animation-duration: 20s;
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
               className="marquee-track flex min-w-max items-center gap-6 sm:gap-12 px-4 sm:px-8 animate-marquee-horizontal"
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

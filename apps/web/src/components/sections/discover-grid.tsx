import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";

type DiscoverGridProps = PagebuilderType<"discoverGrid">;
type DiscoverItem = NonNullable<DiscoverGridProps["items"]>[number];

function getSpanClass(layout?: DiscoverItem["layout"]) {
  switch (layout) {
    case "wide":
      return "md:col-span-2 md:row-span-1";
    case "tall":
      return "md:col-span-1 md:row-span-2";
    case "large":
      return "md:col-span-2 md:row-span-2";
    default:
      return "md:col-span-1 md:row-span-1";
  }
}

function DiscoverCard({ item }: { item: DiscoverItem }) {
  const spanClass = getSpanClass(item.layout);
  const isLarge = item.layout === "large" || item.layout === "wide";
  const CardWrapper = item.href ? Link : "div";

  return (
    <CardWrapper
      href={item.href ?? "#"}
      {...(item.href && item.openInNewTab
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`
        relative overflow-hidden group
        bg-[#0e121e] transition-all duration-300
        border-r border-b border-white/10
        ${spanClass}
        ${item.href ? "cursor-pointer" : ""}
      `}
    >
      {/* Background */}
      {item.image && (
        <SanityImage
          image={item.image}
          width={800}
          height={600}
          className="
            absolute inset-0 h-full w-full object-cover
            blur-[2px]
          "
        />
      )}

      {/* Overlay */}
      {item.image ? (
        <div
          className="
            absolute inset-0 
            bg-[#050814]/70 
            transition duration-300
            group-hover:bg-[#050814]/85
            backdrop-blur-[1px]
          "
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
      )}

      {/* Small card vignette */}
      {!isLarge && (
        <div
          className="
            pointer-events-none absolute inset-0
            opacity-0 group-hover:opacity-100
            transition duration-300
            rounded-[inherit]
            shadow-[inset_0_0_60px_rgba(255,255,255,0.06)]
          "
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 lg:p-8">
        
        {/* Top Section */}
        <div className="flex flex-col gap-5 w-full">

          <div className="flex items-start justify-between w-full">
            
            {/* Logo OR Title */}
            {item.brandLogo ? (
              <div className="h-10 max-w-[90px] flex items-center">
                <SanityImage
                  image={item.brandLogo}
                  width={120}
                  height={32}
                  className="max-h-full w-auto object-contain opacity-90"
                />
              </div>
            ) : (
              !isLarge && (
                <h3
                  className="
                    text-xl md:text-[1.35rem] font-medium leading-snug text-white pr-4
                    transition-all duration-300
                    group-hover:-translate-y-1
                  "
                >
                  {item.title}
                </h3>
              )
            )}

            {/* Arrow */}
            {item.href && (
              <ArrowUpRight className="h-5 w-5 shrink-0 text-white/50 group-hover:text-white transition" />
            )}
          </div>

          {/* Title if logo exists (small cards) */}
          {item.brandLogo && !isLarge && (
            <h3
              className="
                text-xl md:text-[1.35rem] font-medium leading-snug text-white pr-4
                transition-all duration-300
                group-hover:-translate-y-1
              "
            >
              {item.title}
            </h3>
          )}

          {/* ✅ CATEGORY TAG (always visible) */}
          {item.category && (
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8e9bb3]">
              {item.category}
            </p>
          )}
        </div>

        {/* Bottom Section */}
        <div>
          {isLarge && (
            <>
              <h3
                className="
                  mb-3 text-2xl md:text-3xl lg:text-[2rem] font-semibold leading-tight text-white max-w-[90%]
                  transition-all duration-300
                  group-hover:-translate-y-2
                "
              >
                {item.title}
              </h3>

              {/* ✅ SUBTITLE (hover only, normal text) */}
              {item.subtitle && (
                <p
                  className="
                    text-sm text-gray-300 leading-snug
                    opacity-0 translate-y-3
                    transition-all duration-300 delay-75
                    group-hover:opacity-100 group-hover:translate-y-0
                  "
                >
                  {item.subtitle}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}

export function DiscoverGrid({ title, items }: DiscoverGridProps) {
  if (!items?.length) return null;

  return (
    <section className="bg-transparent pt-20 md:pt-28" id="discover-grid">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {title && (
          <h2 className="text-3xl text-center md:text-5xl mb-17 font-semibold mb-10 text-white">
            {title}
          </h2>
        )}

        <div className="
          grid grid-cols-1 md:grid-cols-4
          border-l border-t border-white/10
          auto-rows-[250px] md:auto-rows-[300px]
        ">
          {items.map((item) => (
            <DiscoverCard key={item._key} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
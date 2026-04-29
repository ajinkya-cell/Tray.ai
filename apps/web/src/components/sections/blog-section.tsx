import type { PagebuilderType } from "@/types";
import { BlogCard } from "../blog-card";
import { SanityButtons } from "../elements/sanity-buttons";

type BlogSectionProps = PagebuilderType<"blogSection">;

export function BlogSection({
  heading,
  subheading,
  posts,
  cta,
}: BlogSectionProps) {
  if (!posts?.length) return null;

  return (
    <section
      className="bg-transparent py-20 md:py-28"
      id="blog-section"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            {heading && (
              <h2 className="font-bold text-3xl text-white leading-tight tracking-tight md:text-4xl">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-2 text-slate-400 text-base">{subheading}</p>
            )}
          </div>

          {/* Optional CTA — "See all posts →" */}
          {cta && (
            <SanityButtons
              buttonClassName="rounded-full border border-white/20 bg-transparent text-white hover:bg-white/10 transition-colors"
              buttons={[cta] as unknown as Parameters<typeof SanityButtons>[0]["buttons"]}
              size="default"
            />
          )}
        </div>

        {/* 3-column blog card grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) =>
            post ? (
              <BlogCard blog={post} key={post._id} />
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}

import { TrendingUpDown } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const statsSection = defineType({
  name: "statsSection",
  title: "Stats Section",
  type: "object",
  icon: TrendingUpDown,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
      description:
        "The heading above the stats grid (e.g. 'Proven across global businesses')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "text",
      title: "Subtitle",
      description: "An optional supporting sentence below the title",
      rows: 2,
    }),
    defineField({
      name: "stats",
      type: "array",
      title: "Stats",
      description:
        "Add stat cards — each shows a company logo, a key metric value, and a short label",
      of: [defineArrayMember({ type: "statItem" })],
      validation: (Rule) =>
        Rule.min(1).error("Add at least one stat to display"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      stats: "stats",
    },
    prepare: ({ title, stats }) => ({
      title: title ?? "Untitled Stats Section",
      subtitle: `Stats Section — ${stats?.length ?? 0} stat${stats?.length !== 1 ? "s" : ""}`,
    }),
  },
});

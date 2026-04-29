import { Compass } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const discoverGrid = defineType({
  name: "discoverGrid",
  title: "Discover Grid",
  type: "object",
  icon: Compass,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
      description:
        "The heading above the bento grid (e.g. 'Discover how Tray.ai can help you')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      title: "Discover Cards",
      description:
        "Add 5–6 cards to fill the asymmetric bento grid layout",
      of: [defineArrayMember({ type: "discoverCard" })],
      validation: (Rule) =>
        Rule.min(1).max(9).error("Add between 1 and 9 discover cards"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare: ({ title, items }) => ({
      title: title ?? "Untitled Discover Grid",
      subtitle: `Discover Grid — ${items?.length ?? 0} card${items?.length !== 1 ? "s" : ""}`,
    }),
  },
});

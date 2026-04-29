import { LayoutGrid } from "lucide-react";
import { defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";

export const featureCard = defineType({
  name: "featureCard",
  title: "Feature Card",
  type: "object",
  icon: LayoutGrid,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      description:
        "Short uppercase label above the title (e.g. 'AGENT BUILDER')",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The main heading for this feature card",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "A short explanation of this feature",
      rows: 3,
    }),
    imageWithAltField({
      title: "Feature Image",
      description:
        "A product screenshot or illustration for this feature card",
    }),
  ],
  preview: {
    select: {
      title: "title",
      eyebrow: "eyebrow",
      media: "image",
    },
    prepare: ({ title, eyebrow, media }) => ({
      title: title ?? "Untitled Feature",
      subtitle: eyebrow ?? "Feature Card",
      media,
    }),
  },
});

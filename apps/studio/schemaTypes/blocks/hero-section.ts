import { Star } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  icon: Star,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      description:
        "The large, bold main headline for the hero (e.g. 'Stop wrangling AI. Start orchestrating it.')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      type: "text",
      title: "Subheading",
      description:
        "A supporting sentence below the headline",
      rows: 2,
    }),
    defineField({
      name: "buttons",
      type: "array",
      title: "CTA Buttons",
      description:
        "Add one or more call-to-action buttons (e.g. 'Get a demo', 'Request a trial')",
      of: [defineArrayMember({ type: "button" })],
    }),
    imageWithAltField({
      title: "Hero Image",
      description:
        "A product screenshot or illustration shown on the right side of the hero",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "image",
    },
    prepare: ({ title, media }) => ({
      title: title ?? "Untitled Hero",
      subtitle: "Hero Section",
      media,
    }),
  },
});

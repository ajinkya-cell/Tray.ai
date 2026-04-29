import { Compass } from "lucide-react";
import { defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";

export const discoverCard = defineType({
  name: "discoverCard",
  title: "Discover Card",
  type: "object",
  icon: Compass,

  fields: [
    defineField({
      name: "layout",
      type: "string",
      title: "Card Layout",
      initialValue: "small",
      options: {
        list: [
          { title: "Small (1x1)", value: "small" },
          { title: "Wide (2x1)", value: "wide" },
          { title: "Tall (1x2)", value: "tall" },
          { title: "Large (2x2)", value: "large" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
    }),

    imageWithAltField({
      name: "brandLogo",
      title: "Brand Logo",
    }),

    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),

    // 🔥 ALWAYS PRESENT
    defineField({
      name: "category",
      type: "string",
      title: "Category Tag",
      description: "Shown on all cards",
      validation: (Rule) => Rule.required(),
    }),

    // 🔥 ONLY FOR LARGE/WIDE/TALL
    defineField({
      name: "subtitle",
      type: "string",
      title: "Subtitle (Large Cards Only)",
      description: "Extra line for large/wide/tall cards",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as Record<string, any> | undefined;
          const layout = parent?.layout;
          if (
            ["large", "wide", "tall"].includes(layout) &&
            !value
          ) {
            return "Subtitle is required for large/wide/tall cards";
          }
          return true;
        }),
    }),

    imageWithAltField({
      name: "image",
      title: "Background Image",
    }),

    defineField({
      name: "link",
      type: "customUrl",
      title: "Link",
    }),
  ],

  preview: {
    select: {
      title: "title",
      category: "category",
      subtitle: "subtitle",
      layout: "layout",
      media: "image",
    },
    prepare: ({ title, category, subtitle, layout, media }) => {
      const layoutLabel = layout ? `[${layout.toUpperCase()}]` : "[SMALL]";
      const label = subtitle ? `${category} • ${subtitle}` : category;

      return {
        title: title ?? "Untitled Card",
        subtitle: `${layoutLabel} — ${label}`,
        media,
      };
    },
  },
});
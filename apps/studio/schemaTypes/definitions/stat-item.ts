import { TrendingUp } from "lucide-react";
import { defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";

export const statItem = defineType({
  name: "statItem",
  title: "Stat Item",
  type: "object",
  icon: TrendingUp,
  fields: [
    defineField({
      name: "value",
      type: "string",
      title: "Value",
      description: "The stat number or metric (e.g. '10x faster', '700+')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      description:
        "A short description of what the stat measures (e.g. 'faster integration development')",
      validation: (Rule) => Rule.required(),
    }),
    imageWithAltField({
      name: "logo",
      title: "Company Logo",
      description:
        "The logo of the company this stat belongs to (shown above the value)",
    }),
  ],
  preview: {
    select: {
      value: "value",
      label: "label",
      media: "logo",
    },
    prepare: ({ value, label, media }) => ({
      title: value ?? "Untitled Stat",
      subtitle: label ?? "Stat Item",
      media,
    }),
  },
});

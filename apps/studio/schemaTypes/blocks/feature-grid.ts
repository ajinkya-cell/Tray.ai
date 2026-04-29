import { Layers } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const featureGrid = defineType({
  name: "featureGrid",
  title: "Feature Grid",
  type: "object",
  icon: Layers,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
      description:
        "The heading displayed above the feature cards (e.g. 'Tray.ai is the leader in enterprise orchestration')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      type: "array",
      title: "Feature Cards",
      description: "Add 2 feature cards to display side-by-side",
      of: [defineArrayMember({ type: "featureCard" })],
      validation: (Rule) =>
        Rule.min(1).max(6).error("Add between 1 and 6 feature cards"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      features: "features",
    },
    prepare: ({ title, features }) => ({
      title: title ?? "Untitled Feature Grid",
      subtitle: `Feature Grid — ${features?.length ?? 0} card${features?.length !== 1 ? "s" : ""}`,
    }),
  },
});

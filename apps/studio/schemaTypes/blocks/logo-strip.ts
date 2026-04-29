import { ImageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const logoStrip = defineType({
  name: "logoStrip",
  title: "Logo Strip",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "logos",
      type: "array",
      title: "Logos",
      description:
        "Add partner or client logos to display in the horizontal strip",
      validation: (Rule) => Rule.min(1),
      of: [
        defineArrayMember({
          type: "image",
          title: "Logo",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt Text",
              description:
                "The company name — used by screen readers and search engines",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      logos: "logos",
    },
    prepare: ({ logos }) => ({
      title: "Logo Strip",
      subtitle: logos?.length
        ? `${logos.length} logo${logos.length !== 1 ? "s" : ""}`
        : "No logos added yet",
    }),
  },
});

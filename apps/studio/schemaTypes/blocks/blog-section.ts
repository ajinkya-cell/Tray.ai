import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blogSection = defineType({
  name: "blogSection",
  title: "Blog Section",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      description: "The section title (e.g. 'From the Blog')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      type: "text",
      title: "Subheading",
      description: "An optional supporting line below the heading",
      rows: 2,
    }),
    defineField({
      name: "displayType",
      type: "string",
      title: "Display Type",
      description:
        "Choose whether to show the latest N posts automatically, or hand-pick specific posts",
      options: {
        list: [
          { title: "Latest Posts (automatic)", value: "latest" },
          { title: "Manual Selection", value: "manual" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "latest",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "postsCount",
      type: "string",
      title: "Number of Posts",
      description: "How many of the latest posts to display",
      options: {
        list: [
          { title: "3", value: "3" },
          { title: "6", value: "6" },
          { title: "9", value: "9" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "3",
      hidden: ({ parent }) => parent?.displayType !== "latest",
    }),
    defineField({
      name: "posts",
      type: "array",
      title: "Selected Posts",
      description: "Hand-pick the blog posts to feature in this section",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "blog" }],
          options: { disableNew: true },
        }),
      ],
      hidden: ({ parent }) => parent?.displayType !== "manual",
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          const p = parent as { displayType?: string };
          if (p?.displayType === "manual" && (!value || value.length === 0)) {
            return "Select at least one post when using manual mode";
          }
          return true;
        }),
    }),
    defineField({
      name: "cta",
      type: "button",
      title: "Call-to-Action Button",
      description:
        'Optional "See all posts" button shown at the top-right of the section',
    }),
  ],
  preview: {
    select: {
      title: "heading",
      displayType: "displayType",
    },
    prepare: ({ title, displayType }) => ({
      title: title ?? "Untitled Blog Section",
      subtitle: `Blog Section — ${displayType === "manual" ? "Manual" : "Latest posts"}`,
    }),
  },
});

import { defineField, defineType } from "sanity";
import { Images } from "lucide-react";

export const carouselSection = defineType({
  name: "carouselSection",
  title: "Carousel Section",
  type: "object",
  icon: Images,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
    }),
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "text",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
              media: "image",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      slides: "slides",
    },
    prepare({ slides }) {
      return {
        title: "Carousel Section",
        subtitle: `${slides?.length || 0} slide(s)`,
        media: Images,
      };
    },
  },
});

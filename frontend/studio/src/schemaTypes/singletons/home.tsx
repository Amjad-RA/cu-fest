import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import * as demo from '../../lib/initialValues'

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of home page.',
      title: 'Title',
      type: 'string',
      initialValue: demo.title,
    }),
    defineField({
      name: 'description',
      description: 'Used for the home page description.',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      description: 'Used for the home page subtitle.',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: "heroBanner",
      title: "Hero Banner",
      type: "image",
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility.",
        },
      ],
    }),
  ],
})
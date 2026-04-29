import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoSrc',
      title: 'Company Logo URL',
      type: 'url',
      description: 'URL of the company logo image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoW',
      title: 'Logo Width (px)',
      type: 'number',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'logoH',
      title: 'Logo Height (px)',
      type: 'number',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'desktopRotate',
      title: 'Desktop Rotation (Tailwind class)',
      type: 'string',
      description: 'e.g. "-rotate-[6.85deg]" or "rotate-[2.9deg]"',
    }),
    defineField({
      name: 'desktopPos',
      title: 'Desktop Position (Tailwind class)',
      type: 'string',
      description: 'Absolute position on the 1440-wide canvas, e.g. "left-[102px] top-[142px]"',
    }),
    defineField({
      name: 'desktopBoxW',
      title: 'Desktop Bounding Box Width (px)',
      type: 'number',
    }),
    defineField({
      name: 'desktopBoxH',
      title: 'Desktop Bounding Box Height (px)',
      type: 'number',
    }),
    defineField({
      name: 'mobileRotate',
      title: 'Mobile Rotation (Tailwind class)',
      type: 'string',
      description: 'e.g. "-rotate-[3.5deg]"',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})

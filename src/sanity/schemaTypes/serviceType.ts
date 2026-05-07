import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Service name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'externalImageUrl',
      title: 'External image URL',
      type: 'url',
      description: 'Fallback image URL used until a Sanity-hosted image is uploaded',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'order' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle != null ? `[ ${subtitle} ]` : undefined }
    },
  },
})

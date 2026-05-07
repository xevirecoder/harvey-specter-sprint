import { defineField, defineType } from 'sanity'

export const newsType = defineType({
  name: 'news',
  title: 'News & Achievements',
  type: 'document',
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Date, newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Cover image URL',
      type: 'url',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Article body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'link',
      title: 'External source URL',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'date',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt' },
  },
})

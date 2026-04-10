import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  lexicalEditor,
  lexicalHTMLField,
} from '@payloadcms/richtext-lexical'
import { hasText } from '@payloadcms/richtext-lexical/shared'

const formatSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) {
        return true
      }

      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) {
          return data
        }

        if (typeof data.title === 'string' && (!data.slug || typeof data.slug !== 'string')) {
          data.slug = formatSlug(data.title)
        }

        if (typeof data.slug === 'string') {
          data.slug = formatSlug(data.slug)
        }

        return data
      },
    ],
    beforeChange: [
      ({ data }) => {
        if (!data) {
          return data
        }

        if (data._status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Used in the post URL. Generated automatically from the title if left empty.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short summary shown on the blog homepage.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        admin: {
          placeholder: 'Write your Top Heroes guide here...',
        },
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HeadingFeature({
            enabledHeadingSizes: ['h2', 'h3', 'h4'],
          }),
          UnorderedListFeature(),
          OrderedListFeature(),
          LinkFeature(),
        ],
      }),
      validate: (value) =>
        (value && typeof value === 'object' && hasText(value as Parameters<typeof hasText>[0])) ||
        'Content is required.',
    },
    lexicalHTMLField({
      htmlFieldName: 'contentHtml',
      lexicalFieldName: 'content',
      storeInDB: true,
    }),
  ],
}

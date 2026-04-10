import { cache } from 'react'
import { getPayload } from 'payload'

import config from '@/payload.config'
import type { Media, Post } from '@/payload-types'

const getPayloadClient = cache(async () => {
  const payloadConfig = await config

  return getPayload({ config: payloadConfig })
})

type PostWithHeroImage = Omit<Post, 'heroImage'> & {
  heroImage?: Media | number | null
}

export const getPublishedPosts = cache(async (): Promise<PostWithHeroImage[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 20,
    overrideAccess: false,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return docs as PostWithHeroImage[]
})

export const getPostBySlug = cache(async (slug: string): Promise<PostWithHeroImage | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
  })

  return (docs[0] as PostWithHeroImage | undefined) ?? null
})

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { getPostBySlug } from '@/lib/posts'
import type { Media } from '@/payload-types'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

const formatDate = (value?: string | null) =>
  value
    ? new Intl.DateTimeFormat('en', {
        dateStyle: 'long',
      }).format(new Date(value))
    : null

const getImage = (value: Media | number | null | undefined): Media | null =>
  value && typeof value === 'object' ? value : null

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post not found',
    }
  }

  return {
    title: `${post.title} | Top Heroes Blog`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const heroImage = getImage(post.heroImage)
  const publishedAt = formatDate(post.publishedAt)

  return (
    <article className="blog-shell">
      <div className="blog-ambient blog-ambient-left" />
      <div className="blog-ambient blog-ambient-right" />

      <div className="blog-page">
        <Link className="eyebrow-link" href="/">
          Back to all posts
        </Link>

        <header className="post-header">
          <p className="eyebrow">Blog Post</p>
          <h1>{post.title}</h1>
          <p className="post-dek">{post.excerpt}</p>
          {publishedAt ? <p className="post-meta">{publishedAt}</p> : null}
        </header>

        {heroImage?.url ? (
          <div className="post-image">
            <Image
              alt={heroImage.alt}
              className="post-image-tag"
              height={heroImage.height ?? 900}
              priority
              src={heroImage.url}
              width={heroImage.width ?? 1600}
            />
          </div>
        ) : null}

        <div className="post-content">
          <RichText data={post.content} />
        </div>
      </div>
    </article>
  )
}

import Image from 'next/image'
import Link from 'next/link'

import { getPublishedPosts } from '@/lib/posts'
import type { Media } from '@/payload-types'
import './styles.css'

const formatDate = (value?: string | null) =>
  value
    ? new Intl.DateTimeFormat('en', {
        dateStyle: 'medium',
      }).format(new Date(value))
    : 'Draft'

const getImage = (value: Media | number | null | undefined): Media | null =>
  value && typeof value === 'object' ? value : null

export default async function HomePage() {
  const posts = await getPublishedPosts()

  return (
    <div className="blog-shell">
      <div className="blog-ambient blog-ambient-left" />
      <div className="blog-ambient blog-ambient-right" />

      <div className="blog-page">
        <section className="hero">
          <p className="eyebrow">Payload CMS Blog</p>
          <h1>Write in Payload. Publish a clean, simple blog.</h1>
          <p className="hero-copy">
            Your posts are managed in the Payload admin with rich text editing, then rendered on
            the frontend as a straightforward reading experience.
          </p>
          <div className="hero-actions">
            <a className="button button-solid" href="/admin">
              Open admin
            </a>
            <a
              className="button button-ghost"
              href="https://payloadcms.com/docs"
              rel="noreferrer"
              target="_blank"
            >
              Payload docs
            </a>
          </div>
        </section>

        <section className="posts-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Latest Posts</p>
              <h2>Published writing</h2>
            </div>
            <p className="section-copy">{posts.length} post{posts.length === 1 ? '' : 's'}</p>
          </div>

          {posts.length === 0 ? (
            <div className="empty-state">
              <p>No published posts yet.</p>
              <p>Create one in the admin and publish it to see it here.</p>
            </div>
          ) : (
            <div className="post-grid">
              {posts.map((post) => {
                const heroImage = getImage(post.heroImage)

                return (
                  <article className="post-card" key={post.id}>
                    {heroImage?.url ? (
                      <div className="card-image">
                        <Image
                          alt={heroImage.alt}
                          className="card-image-tag"
                          height={heroImage.height ?? 720}
                          src={heroImage.url}
                          width={heroImage.width ?? 1280}
                        />
                      </div>
                    ) : null}

                    <div className="card-body">
                      <p className="card-meta">{formatDate(post.publishedAt)}</p>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <Link className="card-link" href={`/posts/${post.slug}`}>
                        Read post
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

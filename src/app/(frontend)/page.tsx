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
          <div className="hero-grid">
            <div className="hero-copy-wrap">
              <p className="eyebrow">Top Heroes Blog</p>
              <h1>Top Heroes guides, documentation, and progression notes.</h1>
              <p className="hero-copy">
                A focused knowledge base for Top Heroes covering team builds, event notes, feature
                explanations, and practical guides for new and mid-game players.
              </p>
              <div className="hero-actions">
                <Link className="button button-solid" href="/admin">
                  Open editor
                </Link>
                <a className="button button-ghost" href="#posts">
                  Browse articles
                </a>
              </div>
            </div>

            <div className="hero-panel">
              <p className="hero-panel-label">What you can publish</p>
              <ul className="hero-topics">
                <li>Event walkthroughs and patch notes</li>
                <li>Hero tier lists and team synergy guides</li>
                <li>Progression tips, mistakes, and account planning</li>
              </ul>
              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="hero-stat-value">{posts.length}</span>
                  <span className="hero-stat-label">Published articles</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-value">Guides</span>
                  <span className="hero-stat-label">Built for quick reference</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="posts-section" id="posts">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Knowledge Base</p>
              <h2>Latest guides and references</h2>
            </div>
            <p className="section-copy">{posts.length} article{posts.length === 1 ? '' : 's'}</p>
          </div>

          <div className="tag-row" aria-label="Content topics">
            <span className="tag-pill">Beginner Guides</span>
            <span className="tag-pill">Hero Builds</span>
            <span className="tag-pill">Events</span>
            <span className="tag-pill">Progression</span>
          </div>

          {posts.length === 0 ? (
            <div className="empty-state">
              <p>No published guides yet.</p>
              <p>Start by adding your first Top Heroes article in the admin panel.</p>
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
                        Open guide
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

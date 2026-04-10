'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import type { Media, Post } from '@/payload-types'

type GuidePost = Pick<Post, 'categories' | 'excerpt' | 'id' | 'publishedAt' | 'slug' | 'title'> & {
  heroImage?: Media | number | null
}

type Props = {
  posts: GuidePost[]
}

const allGuides = 'all'

const categoryLabels: Record<Post['categories'][number], string> = {
  'beginner-guides': 'Beginner Guides',
  'hero-builds': 'Hero Builds',
  events: 'Events',
  progression: 'Progression',
}

const formatDate = (value?: string | null) =>
  value
    ? new Intl.DateTimeFormat('en', {
        dateStyle: 'medium',
      }).format(new Date(value))
    : 'Draft'

const getImage = (value: Media | number | null | undefined): Media | null =>
  value && typeof value === 'object' ? value : null

export function HomeGuideIndex({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState<
    Post['categories'][number] | typeof allGuides
  >(allGuides)
  const [search, setSearch] = useState('')

  const categories = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.categories ?? []))),
    [posts],
  )

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return posts.filter((post) => {
      const categoryMatches =
        activeCategory === allGuides || (post.categories ?? []).includes(activeCategory)

      if (!categoryMatches) {
        return false
      }

      if (!query) {
        return true
      }

      const searchableText = [
        post.title,
        post.excerpt,
        ...(post.categories ?? []).map((category) => categoryLabels[category]),
      ]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(query)
    })
  }, [activeCategory, posts, search])

  return (
    <>
      <section className="hero hero-compact">
        <div className="hero-compact-grid">
          <div>
            <p className="eyebrow">Top Heroes Blog</p>
            <h1>Guides and references</h1>
          </div>
        </div>
      </section>

      <section className="posts-section" id="posts">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Knowledge Base</p>
            <h2>Browse by category or search</h2>
          </div>
          <p className="section-copy">
            {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
          </p>
        </div>

        <div className="filter-bar">
          <div className="tag-row" aria-label="Guide categories">
            <button
              className={`tag-pill-button${activeCategory === allGuides ? ' is-active' : ''}`}
              onClick={() => setActiveCategory(allGuides)}
              type="button"
            >
              All Guides
            </button>
            {categories.map((category) => (
              <button
                className={`tag-pill-button${activeCategory === category ? ' is-active' : ''}`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>

          <label className="search-box" htmlFor="guide-search">
            <input
              id="guide-search"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search guides, heroes, events..."
              type="search"
              value={search}
            />
          </label>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="empty-state">
            <p>No guides matched your search.</p>
            <p>Try a different category or broader keywords.</p>
          </div>
        ) : (
          <div className="post-grid">
            {filteredPosts.map((post) => {
              const heroImage = getImage(post.heroImage)

              return (
                <Link
                  aria-label={`Open ${post.title}`}
                  className="post-card"
                  href={`/posts/${post.slug}`}
                  key={post.id}
                >
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
                    {post.categories?.length ? (
                      <div className="card-tags" aria-label="Post categories">
                        {post.categories.map((category) => (
                          <span className="card-tag" key={category}>
                            {categoryLabels[category]}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="card-link">Read article</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </>
  )
}

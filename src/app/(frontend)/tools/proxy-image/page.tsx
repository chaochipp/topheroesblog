'use client'

import { useMemo, useState } from 'react'

const buildProxyURL = (value: string): string => {
  if (!value.trim()) {
    return ''
  }

  return `/api/media/proxy?url=${encodeURIComponent(value.trim())}`
}

export default function ProxyImageToolPage() {
  const [sourceURL, setSourceURL] = useState('')
  const proxiedURL = useMemo(() => buildProxyURL(sourceURL), [sourceURL])

  return (
    <div className="blog-shell">
      <div className="blog-page">
        <section className="posts-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Image Tool</p>
              <h2>Proxy external image URLs</h2>
            </div>
          </div>

          <div className="empty-state">
            <p>Paste an external image URL here and copy the proxied version for local use.</p>
          </div>

          <div className="proxy-tool">
            <label className="proxy-label" htmlFor="proxy-source-url">
              External image URL
            </label>
            <textarea
              className="proxy-textarea"
              id="proxy-source-url"
              onChange={(event) => setSourceURL(event.target.value)}
              placeholder="https://rumine.notion.site/image/attachment..."
              rows={5}
              value={sourceURL}
            />

            <label className="proxy-label" htmlFor="proxy-output-url">
              Proxied URL
            </label>
            <textarea
              className="proxy-textarea"
              id="proxy-output-url"
              readOnly
              rows={4}
              value={proxiedURL}
            />

            <div className="hero-actions">
              <button
                className="button button-solid"
                onClick={async () => {
                  if (!proxiedURL) return
                  await navigator.clipboard.writeText(proxiedURL)
                }}
                type="button"
              >
                Copy proxied URL
              </button>
            </div>

            {proxiedURL ? (
              <div className="post-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Proxied preview" className="post-image-tag" src={proxiedURL} />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  )
}

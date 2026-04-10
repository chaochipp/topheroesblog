import { HomeGuideIndex } from './HomeGuideIndex'
import { getPublishedPosts } from '@/lib/posts'
import './styles.css'

export default async function HomePage() {
  const posts = await getPublishedPosts()

  return (
    <div className="blog-shell">
      <div className="blog-ambient blog-ambient-left" />
      <div className="blog-ambient blog-ambient-right" />

      <div className="blog-page">
        <HomeGuideIndex posts={posts} />
      </div>
    </div>
  )
}

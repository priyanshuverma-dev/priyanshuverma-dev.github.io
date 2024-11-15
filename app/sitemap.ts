import { getBlogPosts } from '@/lib/blog'
import { MetadataRoute } from 'next'

export const dynamic = "force-static"
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getBlogPosts()

  const home = {
    url: 'https://priyanshuverma-dev.github.io/',
    lastModified: new Date().toString(),
  }

  if (!allPosts) return [home]

  const posts = allPosts.map(post => ({
    url: `https://priyanshuverma-dev.github.io/blogs/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  // Date of most recent post
  home.lastModified = allPosts[0].metadata.publishedAt

  return [home, ...posts]
}
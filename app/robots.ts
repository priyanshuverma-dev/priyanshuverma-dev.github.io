import { MetadataRoute } from 'next'
export const dynamic = "force-static"
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://priyanshuverma-dev.github.io/sitemap.xml',
  }
}
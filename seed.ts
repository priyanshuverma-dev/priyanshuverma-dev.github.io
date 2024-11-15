import fs from "node:fs";

type Post = {
  title: string;
  description: string;
  slug: string;
  created_at: string;
  published_at: string;
  edited_at: string | null;
  readable_publish_date: string;
  canonical_url: string;
  body_markdown: string;
  reading_time_minutes: string;
  cover_image: string;
  social_image: string;
};
async function seed() {
  const res = await fetch("https://dev.to/api/articles?username=priyanshuverma&per_page=50")
  const outputDir = "./articles";
  const articles = await res.json()

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }

  for (const article of articles) {

    const fileName = article.slug;

    const filePath = `./${outputDir}/${fileName}.md`


    const res = await fetch(`https://dev.to/api/articles/priyanshuverma/${article.slug}`);
    console.log("Baking:", article.title)

    const post: Post = await res.json()
    const content = parseMarkdownContent(post)
    fs.writeFileSync(filePath, content)
  }

}


seed()



function formatDate(dateString: string) {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split('T')[0];
  return formattedDate;
}


function parseMarkdownContent(post: Post) {
  return `---
title: "${post.title}"
publishedAt: "${formatDate(post.published_at)}"
summary: "${post.description}"
image: "${post.social_image}"
slug: "${post.slug}"
---

${post.body_markdown}
 `.replace(/```/g, '~~~')
}

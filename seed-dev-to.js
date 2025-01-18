import fs from "node:fs";

async function seed() {
  const res = await fetch(
    "https://dev.to/api/articles?username=priyanshuverma&per_page=50"
  );
  const outputDir = "./src/content/blog";
  const articles = await res.json();

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (const article of articles) {
    const fileName = article.title
      .toLocaleLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-").replace(/-+$/, '');

    const filePath = `./${outputDir}/${fileName}.md`;

    const res = await fetch(
      `https://dev.to/api/articles/priyanshuverma/${article.slug}`
    );
    console.log("Baking:", filePath);

    const post = await res.json();
    const content = parseMarkdownContent(post);
    fs.writeFileSync(filePath, content);
  }
}

seed();

function formatDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate;
}

function parseMarkdownContent(post) {
  return `---
title: "${post.title}"
pubDate: "${formatDate(post.published_at)}"
description: "${post.description}"
image: "${post.social_image}"
tags: ${post.tags != [] ? JSON.stringify(post.tags) : '[]'}
---

${post.body_markdown}
 `.replace(/```/g, "~~~");
}

import { Article, Post } from "./types";

export function extractS3Url(url: string) {
  // Find the second "https" part in the URL
  if (!url.includes("/https%3A%2F%2F")) return url;
  const encodedS3Url = url.split("/https%3A%2F%2F")[1];

  if (!encodedS3Url) {
    return ""; // return null if no S3 URL is found
  }

  // Decode the percent-encoded S3 URL
  const decodedS3Url = `https://${decodeURIComponent(encodedS3Url)}`;

  return decodedS3Url;
}

export const fetchPost = async (slug: string): Promise<Post | null> => {
  const res = await fetch(`https://dev.to/api/articles/priyanshuverma/${slug}`);
  const data = res.json();

  if (res.status != 200) {
    return null;
  }
  return data;
};
export const fetchPosts = async (): Promise<Article[]> => {
  const res = await fetch(
    "https://dev.to/api/articles?username=priyanshuverma",
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const data = res.json();

  if (res.status != 200) {
    return [];
  }

  return data;
};

import { Article, Post } from "./types";

export function extractS3Url(url: string) {
  return url;
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
    "https://dev.to/api/articles?username=priyanshuverma&per_page=50",
  );

  const data = res.json();

  if (res.status != 200) {
    return [];
  }

  return data;
};

import { Article, Post } from "@/types";
import axios from "axios";

export async function getBlogPosts(): Promise<Article[]> {
  try {
    const res = await axios.get("https://dev.to/api/articles?username=priyanshuverma&per_page=50");
    const data = res.data;
    return data;
  } catch (error) {
    return [];

  }
}
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await axios.get(`https://dev.to/api/articles/priyanshuverma/${slug}`);
    const data = res.data;


    return data;
  } catch (error) {
    return null;

  }
}
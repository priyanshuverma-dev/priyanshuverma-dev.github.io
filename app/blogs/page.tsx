import React from "react";
import { Article } from "@/lib/types";
import SectionHeading from "@/components/section-heading";
import Post from "@/components/post";

const fetchPost = async (): Promise<Article[]> => {
  const res = await fetch(
    "https://dev.to/api/articles?username=priyanshuverma"
  );

  const data = res.json();

  if (res.status != 200) {
    return [];
  }
  return data;
};

export default async function Blogs() {
  const posts = await fetchPost();

  return (
    <div id="blog" className="scroll-mt-28 mb-28">
      <SectionHeading>My Blogs</SectionHeading>
      <div className="flex flex-col items-center justify-center">
        {posts.map((post, index) => (
          <React.Fragment key={index}>
            <Post post={post} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

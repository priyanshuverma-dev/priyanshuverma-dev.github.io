import React from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import Post from "./post";
import { Article } from "@/lib/types";

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
    <section id="blog" className="scroll-mt-28 mb-28">
      <SectionHeading>My Blogs</SectionHeading>
      <div>
        {posts.map((post, index) => (
          <React.Fragment key={index}>
            <Post post={post} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

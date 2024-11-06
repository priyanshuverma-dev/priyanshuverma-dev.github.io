import { WorkGridItem } from "@/components/grid-item";
import Layout from "@/components/layout/article";
import Section from "@/components/section";
import { extractS3Url, fetchPosts } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Posts",
  description: "Writings of Priyanshu",
};

export default async function Posts() {
  const posts = await fetchPosts();
  return (
    <Layout title="Posts">
      <div className="container max-w-[60ch] mx-auto px-4">
        <h3 className="underline text-[20px] underline-offset-4 decoration-[#525252] mt-[3px] mb-[4px] text-3xl font-bold">
          Posts
        </h3>
        <p className="py-2">Some of my writings</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((work) => (
            <Section>
              <WorkGridItem
                id={work.slug}
                title={work.title}
                thumbnail={extractS3Url(work.social_image)}
                category="posts"
              >
                {work.description.substring(0, 100)}...
              </WorkGridItem>
            </Section>
          ))}
        </div>
      </div>
    </Layout>
  );
}

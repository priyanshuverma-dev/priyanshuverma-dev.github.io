import { notFound } from "next/navigation";
import md from "markdown-it";
import Image from "next/image";
import { extractS3Url } from "@/lib/utils";
import { HiChevronDoubleRight } from "react-icons/hi";
import Link from "next/link";

type Post = {
  title: string;
  description: string;
  slug: string;
  readable_publish_date: string;
  canonical_url: string;
  body_markdown: string;
  reading_time_minutes: string;
  social_image: string;
};

const fetchPost = async (slug: string): Promise<Post | null> => {
  const res = await fetch(`https://dev.to/api/articles/priyanshuverma/${slug}`);

  const data = res.json();

  if (res.status != 200) {
    return null;
  }

  return data;
};

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  if (post == null) return notFound();

  return (
    <>
      <article className="rounded-lg p-4 container max-w-[60ch] mx-auto px-4">
        <div className="prose mx-auto mt-8 dark:prose-invert">
          <h1 className="dark:text-white">{post.title}</h1>
          <div className="mb-4">
            <Link
              href="/posts"
              className="text-teail-600 hover:underline dark:text-white"
            >
              Posts
            </Link>
            <span className="inline-block mx-2">
              <HiChevronDoubleRight />
            </span>
            <h3 className="inline-block text-[18px] decoration-[#525252] dark:text-white mt-[3px] mb-[4px] text-3xl font-bold">
              {post.title}
            </h3>
          </div>

          <div className="text-sm ">
            <span>Published on: {post.readable_publish_date}</span> |{" "}
            <span>{post.reading_time_minutes} min read</span>
          </div>
          <Image
            src={extractS3Url(post.social_image)}
            alt={post.title}
            className="rounded-lg"
            height={400}
            width={720}
            style={{ objectFit: "contain", aspectRatio: 16 / 9 }}
          />

          <div
            dangerouslySetInnerHTML={{
              __html: md().render(post.body_markdown),
            }}
            className="dark:text-white"
          />
        </div>
        <div className="mb-4">
          <Link
            href="/posts"
            className="text-teail-600 hover:underline dark:text-white"
          >
            Posts
          </Link>
          <span className="inline-block mx-2">
            <HiChevronDoubleRight />
          </span>
          <h3 className="inline-block text-[18px] decoration-[#525252] dark:text-white mt-[3px] mb-[4px] text-3xl font-bold">
            {post.title}
          </h3>
        </div>
        <div className="mt-8 text-sm flex items-center justify-center">
          <Link
            href={post.canonical_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 underline"
          >
            Read the original article
          </Link>
        </div>
      </article>
    </>
  );
}

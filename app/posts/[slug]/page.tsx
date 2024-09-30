import { notFound } from "next/navigation";
import md from "markdown-it";
import Image from "next/image";
import { extractS3Url, fetchPost, fetchPosts } from "@/lib/utils";
import { HiChevronDoubleRight } from "react-icons/hi";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;

  // fetch data
  const post = await fetchPost(id);
  if (post == null) return notFound();
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.description,
    category: "Tech",
    authors: {
      name: "Priyanshu Verma",
    },
    openGraph: {
      images: [post.social_image, ...previousImages],
    },
  };
}

export async function generateStaticParams() {
  const posts = await fetchPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: Props) {
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

"use client";

import NextLink from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

export const GridItem = ({
  children,
  href,
  title,
  thumbnail,
}: {
  children: ReactNode;
  href: string;
  title: string;
  thumbnail: string;
}) => (
  <div className="w-full text-center">
    <a href={href} target="_blank" className="cursor-pointer block">
      <Image
        src={thumbnail}
        alt={title}
        className="rounded-lg"
        placeholder="blur"
        loading="lazy"
        width={720} // Adjust as necessary
        height={400} // Adjust as necessary
      />
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm">{children}</p>
    </a>
  </div>
);

export const WorkGridItem = ({
  children,
  category = "works",
  id,
  title,
  thumbnail,
}: {
  children: ReactNode;
  category?: string;
  id: string;
  title: string;
  thumbnail: string;
}) => (
  <div className="w-full text-center">
    <NextLink
      href={category == "works" ? `${id}` : `/${category}/${id}`}
      className="block cursor-pointer"
      target={category == "works" ? "_blank" : "_self"}
    >
      <Image
        src={thumbnail}
        alt={title}
        className="rounded-lg"
        height={400}
        width={720}
        style={{ objectFit: "cover", aspectRatio: 16 / 9 }}
      />
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm">{children}</p>
    </NextLink>
  </div>
);

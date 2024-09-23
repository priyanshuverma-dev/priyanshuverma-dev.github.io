"use client";
import NextLink from "next/link";
import { HiChevronDoubleRight } from "react-icons/hi";
import React from "react";

// Title Component
export const Title = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">
    <NextLink href="/works" passHref className="text-teail-600 hover:underline">
      Works
    </NextLink>
    <span className="inline-block mx-2">
      <HiChevronDoubleRight />
    </span>
    <h3 className="inline-block text-[18px] decoration-[#525252] mt-[3px] mb-[4px] text-3xl font-bold">
      {children}
    </h3>
  </div>
);

// WorkImage Component
export const WorkImage = ({ src, alt }: { src: string; alt: string }) => (
  <img className="rounded-lg w-full mb-4" src={src} alt={alt} />
);

// Meta Component
export const Meta = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
    {children}
  </span>
);

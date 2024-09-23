"use client";
import { motion } from "framer-motion";
import { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 },
};

type Props = {
  children: ReactNode;
  title?: string;
};
export async function generateMetadata(
  { title, children }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `${title} - Priyanshu Verma`,
  };
}

const Article = ({ children, title }: Props) => {
  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: "easeInOut" }}
      style={{ position: "relative" }}
    >
      {children}

      {/* <GridItemStyle /> */}
    </motion.article>
  );
};

export default Article;

"use client";
import Layout from "@/components/layout/article";
import { Title } from "@/components/work";
import { works } from "@/lib/data";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

const WorkLayout = ({
  params,
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) => {
  const { collaborations, old, recent } = works;
  const listings = [...recent, ...collaborations, ...old];

  const work = listings.find((e) => e.id == params.id);

  if (!work) {
    return notFound();
  }

  return (
    <Layout title={work.title}>
      <div className="container max-w-[60ch] mx-auto px-4">
        <Title>
          {work.title}
          {/* <Badge>2005-2008</Badge> */}
        </Title>
        {children}
      </div>
    </Layout>
  );
};

export default WorkLayout;

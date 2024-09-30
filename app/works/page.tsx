import Layout from "@/components/layout/article";
import Section from "@/components/section";
import { WorkGridItem } from "@/components/grid-item";
import { works } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Works of Priyanshu",
};

const { collaborations, old, recent } = works;
const Works = () => (
  <Layout title="Works">
    <div className="container max-w-[60ch] mx-auto px-4">
      <h3 className="underline text-[20px] underline-offset-4 decoration-[#525252] mt-[3px] mb-[4px] text-3xl font-bold">
        Works
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recent.map((work) => (
          <Section delay={work.delay}>
            <WorkGridItem
              key={work.id}
              id={work.link}
              title={work.title}
              thumbnail={work.thumb}
            >
              {work.description}
            </WorkGridItem>
          </Section>
        ))}
      </div>

      <Section delay={0.2}>
        <hr className="my-6 border-[#525252] opacity-40 border-2 rounded" />

        <h3 className="underline text-[20px] underline-offset-4 decoration-[#525252] mt-[3px] mb-[4px] text-3xl font-bold">
          Collaborations
        </h3>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collaborations.map((work) => (
          <Section delay={work.delay}>
            <WorkGridItem
              key={work.id}
              id={work.id}
              title={work.title}
              thumbnail={work.thumb}
            >
              {work.description}
            </WorkGridItem>
          </Section>
        ))}
      </div>

      <Section delay={0.4}>
        <hr className="my-6 border-[#525252] opacity-40 border-2 rounded" />

        <h3 className="underline text-[20px] underline-offset-4 decoration-[#525252] mt-[3px] mb-[4px] text-3xl font-bold">
          Old works
        </h3>
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {old.map((work) => (
          <Section delay={work.delay}>
            <WorkGridItem
              key={work.id}
              id={work.id}
              title={work.title}
              thumbnail={work.thumb}
            >
              {work.description}
            </WorkGridItem>
          </Section>
        ))}
      </div>
    </div>
  </Layout>
);

export default Works;

import NextLink from "next/link";

import Layout from "../components/layout/article";
import Section from "../components/section";
import { SiMinutemailer } from "react-icons/si";
import { IoLogoTwitter, IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { HiChevronDoubleRight } from "react-icons/hi";
import Image from "next/image";
import React from "react";

const Home = () => (
  <Layout>
    <div className="container max-w-[60ch] mx-auto px-4">
      <div className="rounded-lg mb-6 p-3 text-center dark:bg-white/5 bg-white/35 backdrop-blur-md">
        Hello, I&apos;m an open-source developer based in India!
      </div>

      <div className="md:flex">
        <div className="flex-grow">
          <h2 className="text-4xl font-bold">Priyanshu Verma</h2>
          <p>Techy Craftsman ( Founder / Developer / Designer )</p>
        </div>
        <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6 text-center">
          <div className="border-2 border-white rounded-full w-24 h-24 overflow-hidden">
            <Image
              src="/images/priyanshu.jpg"
              alt="Profile image"
              priority
              width="100"
              height="100"
            />
          </div>
        </div>
      </div>

      <Section delay={0.1}>
        <h3 className="underline text-[20px] underline-offset-4 decoration-[#525252] mt-[3px] mb-[4px] text-3xl font-bold">
          Work
        </h3>
        <p className="mt-2">
          Priyanshu is a contributor and a full-stack developer based in India
          with a passion for building digital services/stuff he wants. He has a
          knack for all things founding products, from planning and designing
          all the way to solving real-life problems with code and deploying.
          When not online, he loves hanging out with his pen and paper.
          Currently, he is living off of his own product called{" "}
          <NextLink href="/works/OnSchola" passHref>
            <span className="text-teal-600 hover:underline">OnSchola</span>
          </NextLink>
          . He do open-source for gaining experience and build stuff from
          scratch for fun.
        </p>
        <div className="my-4 text-center">
          <NextLink href="/works" passHref>
            <button className="bg-teal-600 hover:bg-teal-700 transition-colors text-white px-4 py-2 rounded flex items-center">
              My portfolio
              <HiChevronDoubleRight className="ml-2" />
            </button>
          </NextLink>
        </div>
      </Section>

      <Section delay={0.2}>
        <h3 className="underline text-[20px] underline-offset-4 decoration-[#525252] mt-[3px] mb-[4px] text-3xl font-bold">
          Bio
        </h3>
        <BioSection year="2007">Born in UP, India.</BioSection>
        <BioSection year="2020">
          Started as Tech Youtuber/Video Editor
        </BioSection>
        <BioSection year="2021">Switched to Game dev</BioSection>
        <BioSection year="2022">Found Mobile Dev interesting</BioSection>
        <BioSection year="2023">Got experience in Web dev</BioSection>
        <BioSection year="2024">Completed 10th grade</BioSection>
        <BioSection year="2024 to present">
          Working as indie dev and open-source contributor
        </BioSection>
      </Section>

      <Section delay={0.3}>
        <h3 className="underline text-[20px] underline-offset-4 decoration-[#525252] mt-[3px] mb-[4px] text-3xl font-bold">
          I ♥
        </h3>
        <p className="mt-2">
          Art, Music,{" "}
          <NextLink
            href="https://priyanshuverma.itch.io"
            target="_blank"
            className="text-teal-600 hover:underline"
          >
            Games
          </NextLink>
          , Physics,{" "}
          <NextLink
            href="https://github.com/priyanshuverma-dev"
            target="_blank"
            className="text-teal-600 hover:underline"
          >
            Piece of code
          </NextLink>
          , IOT,{" "}
          <NextLink
            href="https://dev.to/priyanshuverma"
            target="_blank"
            className="text-teal-600 hover:underline"
          >
            Writing
          </NextLink>
        </p>
      </Section>

      <Section delay={0.3}>
        <h3 className="underline text-[20px] underline-offset-4 decoration-[#525252] mt-[3px] mb-[4px] text-3xl font-bold">
          On the web
        </h3>
        <ul className="list-none">
          <li>
            <NextLink
              href="https://github.com/priyanshuverma-dev"
              target="_blank"
              className="bg-transparent text-teal-600 px-4 py-2 rounded flex items-center"
            >
              <IoLogoGithub className="mr-2" />
              @priyanshuverma-dev
            </NextLink>
          </li>
          <li>
            <NextLink
              href="https://www.linkedin.com/in/priyanshu-verma-dev"
              target="_blank"
              className="bg-transparent text-teal-600 px-4 py-2 rounded flex items-center"
            >
              <IoLogoLinkedin className="mr-2" />
              @priyanshuverma-dev
            </NextLink>
          </li>
          <li>
            <NextLink
              className="bg-transparent text-teal-600 px-4 py-2 rounded flex items-center"
              href="https://twitter.com/pvdev"
              target="_blank"
            >
              <IoLogoTwitter className="mr-2" />
              @pvdev
            </NextLink>
          </li>
        </ul>

        <h3 className="underline text-[20px] underline-offset-4 decoration-[#525252] mt-[3px] mb-[4px] text-3xl font-bold">
          Newsletter
        </h3>
        <p>
          Join me on a behind-the-scenes coding journey. Weekly updates on
          projects, tutorials, and videos
        </p>

        <div className="my-1 flex items-center text-center">
          <NextLink
            href="https://priyanshuverma.hashnode.dev/newsletter"
            passHref
          >
            <button className="bg-teal-600 text-white px-4 py-2 rounded flex items-center hover:bg-teal-700 transition-colors">
              Sign up for my newsletter here
              <SiMinutemailer className="ml-2" />
            </button>
          </NextLink>
        </div>
      </Section>
    </div>
  </Layout>
);
const BioSection = ({
  year,
  children,
}: {
  year: string;
  children: React.ReactNode;
}) => (
  <div className="flex">
    <span className="font-bold">{year}:</span>
    <span className="ml-2">{children}</span>
  </div>
);
export default Home;

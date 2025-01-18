import BuildJournal from "./assets/images/build-journal.png";
import InfinyonPriyanshu from "./assets/images/infinyon-priyanshu.png";
import Sangeet from "./assets/images/sangeet.png";
import StatSteam from "./assets/images/StatStream.png";


export default {
  url: "https://priyanshuverma-dev.github.io/",
  title: "Priyanshu Verma's Thoughts & Creations",
  description:
    "A collection of coding tutorials, project showcases, and insightful thoughts on tech and development.",
  image: "/me.jpg",
  name: "Priyanshu Verma",
  social: {
    github: "https://github.com/priyanshuverma-dev",
    twitter: "https://x.com/pvdev",
    linkedin: "https://www.linkedin.com/in/priyanshu-verma-dev/",
  },
   summary : `
  Technologist and open-source developer based in India.\\
  Passionate about **understanding how machines work perfectly** with a strong interest in **programming**, **mechanics**,  and **physics**.
  Always open to collaborating with like-minded people,
  also founder of the **[@DIYBuilds](https://github.com/DIYBuilds)**,
  where I showcase and develop a variety of personal and open-source projects 🚀.
`,

  avatarUrl: "/oggy.svg",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Rust",
    "Python",
    "MongoDB",
    "Docker",
    "C#",
    "Video Editing",
    "Flutter",
  ],
  contact: {
    email: "priyanshuverma [at] outlook [dot] in",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/priyanshuverma-dev",
        icon: "mdi:github",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/priyanshu-verma-dev/",
        icon: "mdi:linkedin",
      },
      {
        name: "X",
        url: "https://x.com/pvdev",
        icon: "mdi:twitter",
      },
    ],
  },
  work: [
    {
      company: "GirlScript Summer of Code",
      href: "https://gssoc.girlscript.tech",
      badges: [],
      location: "Remote",
      title: "Open Source Developer",
      logoUrl:
        "https://user-images.githubusercontent.com/63473496/153487849-4f094c16-d21c-463e-9971-98a8af7ba372.png",
      start: "October 2024",
      end: "November 2024",
      description: `- Improved and maintained may open source projects with **different** stack
- Implemented a **End-to-end encryption in an application** using RSA Public and Private Key
- Implemented logic to make a simple flask template website a **Single Page WebApp** without any **package** with raw JavaScript and Python.`,
      links: [],
    },
  ],
  education: [
    {
      school: "Milton Educational Academy",
      href: "https://miltonacademy.in/",
      degree: "Senior Secondary (CBSE) PCM (Physics, Chemistry, Mathematics)",
      logoUrl:
        "https://miltonacademy.in/wp-content/uploads/2022/04/Milton-Logo.png",
      start: "2024",
      end: "2026",
    },
    {
      school: "Dhillon Educational Academy",
      href: "https://dhilloneducationalacademy.com/",
      degree: "Secondary School (CBSE) | X - 90%",
      logoUrl:
        "https://dhilloneducationalacademy.com/wp-content/uploads/2024/10/dhillon-image.png",
      start: "2014",
      end: "2024",
    },
  ],

  projects: [
    {
      title: "Sangeet",
      href: "https://github.com/DIYBuilds/sangeet",
      dates: "May 2024 - Present",
      active: true,
      description:
        "Sangeet Music Player for Windows, an open-source desktop application that allows you to enjoy your favorite music seamlessly.",
      technologies: ["Flutter", "Sangeet API", "Jio Cinema", "Dart"],
      links: [
        {
          type: "Releases",
          href: "https://github.com/DIYBuilds/sangeet/releases",
          icon: "mdi:github",
        },
        {
          type: "Source",
          href: "https://github.com/DIYBuilds/sangeet",
          icon: "mdi:github",
        },
      ],
      image: Sangeet,
    },
    {
      title: "StatStream",
      href: "https://github.com/DiyBuilds/StatStream",
      dates: "November 2024 - Present",
      active: true,
      description:
        "StatStream is a web analytics tracking project designed to monitor and store website statistics using Discord for reporting.",
      technologies: ["Discord", "Docker", "Analytics"],
      links: [
        {
          type: "Source",
          href: "https://github.com/DiyBuilds/StatStream",
          icon: "mdi:github",
        },
        {
          type: "Studio",
          href: "https://statstream.pages.dev/",
          icon: "mdi:globe",
        },
        {
          type: "Docs",
          href: "https://diybuilds.github.io/StatStream/",
          icon: "mdi:globe",
        },
      ],
      image: StatSteam,
    },
    {
      title: "Build Journal",
      href: "https://build-journal.vercel.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "Build Journal is a web application that helps developers document their project ideas, development progress, and feature additions, all in one place.",
      technologies: ["Next.js", "Typescript", "CopilotKit", "Prisma"],
      links: [
        {
          type: "Website",
          href: "https://build-journal.vercel.app/",
          icon: "mdi:globe",
        },
        {
          type: "Source",
          href: "https://github.com/DIYBuilds/build-journal",
          icon: "mdi:github",
        },
      ],
      image:BuildJournal,
    },
    {
      title: "StockViz",
      href: "https://stockviz.vercel.app/",
      dates: "August 2024 - September 2024",
      active: true,
      description:
        "This service provides a simple code snippet that you can add to your website to display a real-time stock chart powered by Fluvio.io's high-performance data streaming.",
      technologies: ["Next.js", "Fluvio", "Rust", "TypeScript"],
      links: [
        {
          type: "Website",
          href: "https://stockviz.vercel.app/",
          icon: "mdi:globe",
        },
        {
          type: "Source",
          href: "https://github.com/DIYBuilds/stock-charts",
          icon: "mdi:github",
        },
      ],
      image: InfinyonPriyanshu,
    },
  ],
} as const;

export const CONTACT_FORM_ID = "cmOmloEL";

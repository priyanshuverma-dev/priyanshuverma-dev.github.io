import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  url: "https://priyanshuverma-dev.github.io",
  name: "Priyanshu Verma",
  initials: "PV",
  description:
    "Techologist and Open-source developer based in India building stuff from scratch with latest tech.",
  summary:
    "Hi, I am Priyanshu Verma Techologist and Open-source developer based in India. I'm a **17-year-old coding enthusiast** with a keen interest in App and Web Development. Passionate about **Programming**, **kinematics**, **IoT**, **Physics**, and **Space**. Always open to collaborating with like-minded people. I'm also managing the **[KeptCodes](https://github.com/KeptCodes)** organization, where I host and develop my personal and side projects 🚀.",
  dock: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blogs", icon: NotebookIcon, label: "Blog" },
  ],
  avatarUrl: "/me.jpg",
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
    "Flutteer",
  ],
  contact: {
    email: "priyanshuverma@outlook.in",
    tel: "+91 8630169128",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/priyanshuverma-dev",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/priyanshu-verma-dev/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/pvdev",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:priyanshuverma@outlook.in",
        icon: Icons.email,

        navbar: false,
      },
    },
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
      href: "https://github.com/KeptCodes/sangeet",
      dates: "May 2024 - Present",
      active: true,
      description:
        "Sangeet Music Player for Windows, an open-source desktop application that allows you to enjoy your favorite music seamlessly.",
      technologies: ["Flutter", "Sangeet API", "Jio Cinema", "Dart"],
      links: [
        {
          type: "Releases",
          href: "https://github.com/KeptCodes/sangeet/releases",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/KeptCodes/sangeet",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/images/sangeet.png",
    },
    {
      title: "StatStream",
      href: "https://github.com/KeptCodes/StatStream",
      dates: "November 2024 - Present",
      active: true,
      description:
        "StatStream is a web analytics tracking project designed to monitor and store website statistics using Discord for reporting.",
      technologies: ["Discord", "Docker", "Analytics"],
      links: [
        {
          type: "Source",
          href: "https://github.com/KeptCodes/StatStream",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/images/StatStream.png",
    },
    {
      title: "Build Journal",
      href: "https://build-journal.vercel.app/",
      dates: "September 2024 - October 2024",
      active: true,
      description:
        "Build Journal is a web application that helps developers document their project ideas, development progress, and feature additions, all in one place. It also allows generating markdown project logs, providing documentation, and tracking a project from start to end.",
      technologies: ["Next.js", "Typescript", "CopilotKit", "Prisma"],
      links: [
        {
          type: "Website",
          href: "https://build-journal.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/KeptCodes/build-journal",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/images/build-journal.png",
    },
    {
      title: "StockViz",
      href: "https://stockviz.vercel.app/",
      dates: "August 2024 - September 2024",
      active: true,
      description:
        "ur service provides a simple code snippet that you can add to your website to display a real-time stock chart powered by Fluvio.io's high-performance data streaming.",
      technologies: ["Next.js", "Fluvio", "Rust", "TypeScript"],
      links: [
        {
          type: "Website",
          href: "https://stockviz.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/KeptCodes/stock-charts",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image:
        "https://utfs.io/f/VZFfCDtvlEtcTBma9gjy7dULtnRmfPkC9BJlFqNS5KIZQWr1",
    },
  ],
};

interface RecentWork {
  id: string;
  title: string;
  thumb: string;
  description: string;
  delay?: number;
  link: string;
  slug?: string;
}

interface Works {
  recent: RecentWork[];
  collaborations: RecentWork[];
  old: RecentWork[];
}

export const projectsData = [
  {
    title: "Saavn Desktop",
    description:
      "The Saavn Music Player for Windows, an open-source desktop application that allows you to enjoy your favorite music seamlessly. This music player is powered by the Saavn API and built with Flutter, providing a robust and modern user experience.",
    tags: ["Flutter", "Riverpod", "Windows", "Music", "Saavn API"],
    imageUrl: "/p/no-image.png",
    link: "https://github.com/priyanshuverma-dev/saavn",
  },
  {
    title: "Circle Wallet Parody",
    description:
      "This project is a custom wallet application built on Circle's Programmable Wallets platform. The aim is to provide users with a seamless and feature-rich experience for managing their digital assets, leveraging the power of USDC and Circle's technology stack.",
    tags: ["Cryptocoin", "Next.js", "MongoDB", "Tailwind", "Circle"],
    imageUrl: "/p/image-wallet.png",
    link: "https://circle-wallet.vercel.app",
  },
  {
    title: "Checkcup - Quine",
    description:
      "Checkcup is a website monitoring tool that fetches the status of websites along with screenshots and active status. It is built using Next.js for the frontend and Puppeteer with Browserless in the backend.",
    tags: ["Browserless", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    imageUrl: "/p/image-checkcup.png",
    link: "https://quine-checkcup.vercel.app",
  },
  {
    title: "Certifolio",
    description:
      "CertiFolio is a platform where users can securely upload, showcase, and verify their certificates and achievements on the InterPlanetary File System (IPFS).",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    imageUrl: "/p/image-certifolio.png",
    link: "https://certifolio.p7u.tech",
  },

  {
    title: "Snapline",
    description:
      "SnapLine: Where Creativity Flourishes! Join us to explore and share captivating prompts, spark discussions, and connect with fellow creators. Unleash your imagination and turn prompts into masterpieces. Welcome to the world of SnapLine.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    imageUrl: "/p/image-snapline.png",
    link: "https://snapLine.p7u.tech",
  },

  {
    title: "Rainbow",
    description:
      "Unleash your creativity with Rainbow – the ultimate online tool for unlimited and free multimedia conversion. Transform images, audio, and videos effortlessly, without restrictions. Start converting now and elevate your content like never before!",
    imageUrl: "/p/image-rainbow.png",
    tags: ["React", "Next.js", "WASM", "Tailwind"],
    link: "https://rainbow-converter.vercel.app/",
  },
  {
    title: "Bard Chat",
    description:
      "A Python-based chatbot project that integrates the Bard API for natural language processing and voice interaction. This chatbot can listen to voice input, process user queries, and respond with audio output.",
    imageUrl: "/p/image-bard-chatbot.png",
    tags: ["Python", "AI", "Google Bard"],
    link: "https://github.com/priyanshuverma-dev/bard-chatbot",
  },
  {
    title: "Linkey",
    description:
      "Elevate your online presence with our powerful URL shortening service and gain full control over your links. Our SaaS platform offers a comprehensive API solution, empowering developers to integrate and customize our URL shortening capabilities into their own applications seamlessly.",
    imageUrl: "/p/image-linkey.png",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    link: "https://linkey-ws.vercel.app/",
  },

  {
    title: "Tik Tok Clone",
    description:
      "Web application works similar to Tik Tok. Users can create and share their own videos. Users can also like and comment on other users' videos.",
    tags: ["React", "Sanity", "Tailwind"],
    imageUrl: "/p/image-tik-clone.png",
    link: "https://clone-tok.vercel.app/",
  },
  {
    title: "Gita Mobile",
    description:
      "Mobile application allows you to read and understand power og Bhagavd Gita. It has all chapters and shloks of gita with translations and commentaries.",
    tags: ["Flutter", "Getx", "MongoDB"],
    imageUrl: `/p/no-image.png`,
    link: "https://github.com/priyanshuverma-dev/Gita-Mobile",
  },
  {
    title: "Netflix Clone",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["React", "Next.js", "MongoDb", "Tailwind"],
    imageUrl: "/p/image-netflex-clone.png",
    link: "https://priflex.vercel.app/",
  },
  {
    title: "Delta",
    description:
      "Mobile application that enables users to search for answers to common questions and share their own answers. This is a mobile-first application that is fully responsive and works on all devices.",
    tags: ["Flutter", "Riverpod", "ChatGPT3"],
    imageUrl: `/p/image-delta.png`,
    link: "https://github.com/priyanshuverma-dev/delta",
  },
] as const;

// add 0.1 delay after every two
export const works: Works = {
  recent: [
    {
      id: "sangeet",
      title: "Sangeet",
      description:
        "Desktop application that allows you to enjoy your favorite music seamlessly.",
      thumb: "/p/no-image.png",
      link: "https://github.com/priyanshuverma-dev/saavn",
    },
    {
      id: "certifolio",
      title: "Certifolio",
      description:
        "CertiFolio is a platform where users can securely upload Achievements.",
      thumb: "/p/image-certifolio.png",
      link: "https://github.com/priyanshuverma-dev/certifolio-web",
    },
  ],
  collaborations: [
    {
      id: "stockviz",
      title: "StockViz",
      description: "Embed Real-Time Stock Charts on Your Website.",
      thumb: "/p/no-image.png",
      link: "https://github.com/priyanshuverma-dev/stock-charts",
      delay: 0.3,
    },
    {
      id: "checkcup",
      title: "Checkcup",
      description: "Checkcup is a website monitoring tool.",
      thumb: "/p/image-checkcup.png",
      link: "https://quine-checkcup.vercel.app",
      delay: 0.3,
    },
  ],
  old: [
    {
      id: "bardchat",
      title: "Bard Chat",
      description:
        "A Python-based chatbot project that integrates the Bard API for natural language processing and voice interaction.",
      thumb: "/p/image-bard-chatbot.png",
      link: "https://github.com/priyanshuverma-dev/bard-chatbot",
      delay: 0.5,
    },
    {
      id: "linkey",
      title: "Linkey",
      description:
        "Powerful URL shortening service and gain full control over your links.",
      thumb: "/p/image-linkey.png",
      link: "https://linkey-ws.vercel.app/",
      delay: 0.5,
    },
    {
      id: "tiktok",
      title: "Tik Tok Clone",
      description: "Web application works similar to Tik Tok.",
      thumb: "/p/image-tik-clone.png",
      link: "https://clone-tok.vercel.app/",
      delay: 0.6,
    },
    {
      id: "gitamobile",
      title: "Gita Mobile",
      description:
        "Mobile application allows you to read and understand power og Bhagavd Gita.",
      thumb: `/p/no-image.png`,
      link: "https://github.com/priyanshuverma-dev/Gita-Mobile",
      delay: 0.6,
    },
    {
      id: "netflix",
      title: "Netflix Clone",
      description: "A netflex clone made for fun.",

      thumb: "/p/image-netflex-clone.png",
      link: "https://priflex.vercel.app/",
      delay: 0.7,
    },
    {
      id: "delta",
      title: "Delta",
      description:
        "Mobile application that enables users to search for answers from AI.",

      thumb: `/p/no-image.png`,
      link: "https://github.com/priyanshuverma-dev/delta",
      delay: 0.7,
    },
  ],
};

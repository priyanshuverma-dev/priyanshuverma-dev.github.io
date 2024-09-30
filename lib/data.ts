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
      thumb:
        "https://utfs.io/f/VZFfCDtvlEtcTBma9gjy7dULtnRmfPkC9BJlFqNS5KIZQWr1",
      link: "https://github.com/priyanshuverma-dev/stock-charts",
      delay: 0.3,
    },
    {
      id: "edunotify",
      title: "EduNotify",
      description:
        "EduNotify is a notice board feature for educational institutions. ",
      thumb:
        "https://utfs.io/f/VZFfCDtvlEtcptIbTVJdjw8CvmPQaTGg9bXz6RWIlO1e4Uxt",
      link: "https://github.com/priyanshuverma-dev/edunotify",
      delay: 0.3,
    },
    {
      id: "checkcup",
      title: "Checkcup",
      description: "Checkcup is a website monitoring tool.",
      thumb:
        "https://utfs.io/f/VZFfCDtvlEtc4tUAjsK6PfbW5nKNBHeaECs08OgXGYhd1U7q",
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

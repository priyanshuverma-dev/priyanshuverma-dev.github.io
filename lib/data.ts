import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  url: "http://localhost:3000",
  name: "Priyanshu Verma",
  dock: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
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


}
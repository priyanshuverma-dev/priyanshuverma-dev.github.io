"use client";
import React, { forwardRef } from "react";
import Logo from "./logo";
import NextLink from "next/link";
import { IoLogoLinkedin } from "react-icons/io5";
import ThemeToggleButton from "./theme-toggle-button";
import { usePathname } from "next/navigation";

interface LinkItemProps {
  href: string;
  path: string;
  target?: string;
  children: React.ReactNode;
  [key: string]: any; // Allow other props
}

const LinkItem: React.FC<LinkItemProps> = ({
  href,
  path,
  target,
  children,
  ...props
}) => {
  const active = path === href;
  return (
    <NextLink
      href={href}
      passHref
      className={`p-2 ${
        active ? "bg-teal-500 text-gray-800" : "text-gray-900 dark:text-white"
      } rounded-md`}
      target={target ?? "_self"}
      {...props}
    >
      {children}
    </NextLink>
  );
};

interface MenuLinkProps {
  href: string;
  children: React.ReactNode;
}

const MenuLink = forwardRef<HTMLAnchorElement, MenuLinkProps>(
  ({ href, children, ...props }, ref) => (
    <NextLink href={href} passHref ref={ref} {...props}>
      {children}
    </NextLink>
  )
);

MenuLink.displayName = "MenuLink"; // Fixes forwardRef component display name issue

const Navbar = () => {
  const path = usePathname();
  return (
    <nav className="fixed w-full bg-[##ffffff40] bg-opacity-40 dark:bg-[#20202380] bg-blur z-20 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto flex flex-row justify-between items-center p-4">
        <div className="flex items-center">
          <h1 className="text-lg font-bold tracking-tight">
            <Logo />
          </h1>
        </div>

        <div className="hidden md:flex space-x-4 items-center">
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
          <LinkItem href="/posts" path={path}>
            Posts
          </LinkItem>
          <LinkItem href="/contact" path={path}>
            Contact
          </LinkItem>
          <LinkItem
            href="https://www.linkedin.com/in/priyanshu-verma-dev"
            path={path}
            target="_blank"
            className="inline-flex items-center space-x-2 pl-2"
          >
            <IoLogoLinkedin />
            <span>Connect</span>
          </LinkItem>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggleButton />
          <div className="block md:hidden">
            <MenuDropdown path={path} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const MenuDropdown: React.FC<{ path: string }> = ({ path }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        className="p-2 border rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="flex flex-col items-center space-y-2 py-2 absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md">
          <MenuLink href="/">About</MenuLink>
          <MenuLink href="/works">Works</MenuLink>
          <MenuLink href="/posts">Posts</MenuLink>
          <MenuLink href="/contact">Contact</MenuLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;

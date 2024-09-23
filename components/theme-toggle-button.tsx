"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(newTheme === "dark");
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: "inline-block" }}
        key={isDark ? "dark" : "light"}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <button
          aria-label="Toggle theme"
          className={`p-2 rounded-full transition-colors duration-300 ${
            isDark ? "bg-orange-500 text-white" : "bg-purple-500 text-white"
          }`}
          onClick={toggleTheme}
        >
          {isDark ? <IoSunny /> : <IoMoon />}
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeToggleButton;

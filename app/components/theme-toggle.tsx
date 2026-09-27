"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        // Layout
        fixed bottom-16 right-5
        flex items-center justify-center

        // Spacing
        p-3

        // Background & Appearance
        bg-accent rounded-full
        shadow-lg cursor-pointer

        // Typography
        text-white
      `}
      aria-label="Toggle Theme"
      initial={{ width: 50, height: 50 }}
      whileHover={{ width: 180, height: 50 }}
      transition={{ type: "tween", ease: "linear" }}
    >
      {/* Text */}
      <div className="hidden lg:block">
        <AnimatePresence>
          {isHovered && <span className="mr-4 truncate">Switch Theme</span>}
        </AnimatePresence>
      </div>

      {/* Icon */}
      <div className="relative w-8 h-8">
        <Image
          src={`/icons/${theme === "light" ? "light-mode" : "dark-mode"}.svg`}
          alt={`${theme === "light" ? "Light" : "Dark"} Mode Icon`}
          fill
        />
      </div>
    </motion.button>
  );
}

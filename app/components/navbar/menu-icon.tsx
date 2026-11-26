"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

interface MenuIconProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function MenuIcon({ isMenuOpen, toggleMenu }: MenuIconProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <button
      onClick={toggleMenu}
      className="lg:hidden p-2 z-50"
      aria-label="Toggle menu"
    >
      <div className="relative w-8 h-8">
        {isMenuOpen ? (
          // Close icon.
          <Image
            src={`/icons/close${isDark ? "-dark" : ""}.svg`}
            alt="Close Icon"
            fill
          />
        ) : (
          // Open icon.
          <Image
            src={`/icons/menu${isDark ? "-dark" : ""}.svg`}
            alt="Menu Icon"
            fill
          />
        )}
      </div>
    </button>
  );
}

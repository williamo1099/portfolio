"use client";
import { ThemeProvider } from "next-themes";

import ThemeToggle from "./theme-toggle";

export default function ThemeWrapper({ children }) {
  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      {children}
      <ThemeToggle />
    </ThemeProvider>
  );
}

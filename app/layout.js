import ThemeWrapper from "./components/theme-wrapper";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import ThemeToggle from "./components/theme-toggle";
import TriangleBackground from "./components/triangle-background";
import { poppins } from "./fonts/poppins";

import "./globals.css";

export const viewport = {
  themeColor: "#6595ce",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: "William Oktavianus",
  description:
    "Portfolio of William Oktavianus - a software developer, artist and lifelong learner",
  keywords: [
    "William Oktavianus",
    "William Oktavianus Kurniawan",
    "williamo1099",
    "Software Developer",
    "Artist",
    "Lifelong Learner",
  ],
  openGraph: {
    title: "William Oktavianus",
    description:
      "Portfolio of William Oktavianus - a software developer, artist and lifelong learner",
    url: "https://williamoktavianus.dev",
    siteName: "William Oktavianus",
    locale: "en_US",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          // Layout
          h-screen w-screen

          // Overflow & Spacing
          overflow-hidden m-0 p-0

          // Typography
          font-poppins ${poppins.variable} text-foreground-light dark:text-foreground-dark

          // Background
          bg-background-light dark:bg-background-dark
        `}
      >
        <ThemeWrapper>
          {/* Modal */}
          <div id="modal-root"></div>

          {/* Navigation Bar */}
          <Navbar />
          <TriangleBackground />

          {/* Content */}
          <main className="z-10 relative">
            <div
              className="
                // Layout
                flex flex-col justify-center items-center
                h-[calc(100dvh-3rem)]

                // Overflow & Spacing
                overflow-auto
                pt-10
              "
            >
              {children}
            </div>

            <ThemeToggle />
          </main>

          {/* Footer */}
          <Footer />
        </ThemeWrapper>
      </body>
    </html>
  );
}

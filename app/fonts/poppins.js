import localFont from "next/font/local";

export const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  src: [
    { path: "./Poppins-Regular-400.woff2", weight: "400", style: "normal" },
    { path: "./Poppins-Italic-400.woff2", weight: "400", style: "italic" },
    { path: "./Poppins-Medium-500.woff2", weight: "500", style: "normal" },
    { path: "./Poppins-SemiBold-600.woff2", weight: "600", style: "normal" },
    { path: "./Poppins-Bold-700.woff2", weight: "700", style: "normal" },
  ],
});

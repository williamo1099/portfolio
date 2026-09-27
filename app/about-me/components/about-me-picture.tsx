"use client";
import Image from "next/image";
import { motion } from "motion/react";

export default function AboutMePicture() {
  return (
    <div className="relative w-48 h-48 lg:w-72 lg:h-72 mt-10 lg:mt-0 mx-3">
      <motion.div
        className="absolute z-0 inset-0 rounded-lg border-4 bg-primary border-accent"
        initial={{ x: "-20%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      ></motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
          ease: "easeIn",
        }}
      >
        <Image
          src="/images/profile.webp"
          alt="Profile Picture"
          width={400}
          height={600}
          className="relative z-10 -translate-y-24 lg:-translate-y-36"
        />
      </motion.div>
    </div>
  );
}

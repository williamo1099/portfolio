"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

const colorPoints = [
  {
    label: "Primary",
    color: "#6595CE",
    borderColor: "#000000",
    lineWidth: "60px",
    position: { top: "48px", left: "70px" },
  },
  {
    label: "Accent",
    color: "#CA3333",
    borderColor: "#000000",
    lineWidth: "60px",
    position: { top: "70px", left: "85px" },
  },
  {
    label: "White",
    color: "#FCFDFE",
    borderColor: "#000000",
    lineWidth: "60px",
    position: { top: "150px", left: "90px" },
  },
  {
    label: "Black",
    color: "#212121",
    borderColor: "#FFFFFF",
    lineWidth: "80px",
    position: { top: "180px", left: "67px" },
  },
];

export default function ReiColorPaletteImage() {
  return (
    <div className="relative w-[150px] h-[250px] mx-auto">
      <Image
        src="/images/color-palette.webp"
        alt="Rei Ayanami"
        width={150}
        height={250}
        priority
      />

      {/* Dynamic Arrows */}
      {colorPoints.map((point, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, width: "0%" }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: index }}
          style={{
            position: "absolute",
            top: point.position.top,
            left: point.position.left,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {/* Circle */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: point.color,
              border: `1.5px solid ${point.borderColor}`,
            }}
          ></motion.div>

          {/* Arrow */}
          <div
            className={`h-[2px] bg-foreground-light dark:bg-foreground-dark`}
            style={{
              width: point.lineWidth,
            }}
          ></div>

          {/* Label */}
          <span className="text-sm">{point.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import ReactDOM from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import TraitQuote from "./trait-quote";
import Separator from "@/app/components/separator";

import { TraitItem } from "@/data/traits";

interface TraitModalProps {
  trait: TraitItem;
  isModalOpen: boolean;
  onClose: () => void;
}

export default function TraitModal({
  trait,
  isModalOpen,
  onClose,
}: TraitModalProps) {
  const modalRoot =
    typeof document !== "undefined"
      ? document.getElementById("modal-root")
      : null;

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-0"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background-light dark:bg-background-dark rounded-lg border border-gray-200 dark:border-white/15 shadow-2xl max-w-[90vw] lg:max-w-2xl max-h-[70vh] lg:max-h-fit overflow-y-auto w-full"
          >
            {/* Modal Header */}
            <div className="bg-background-light dark:bg-background-dark sticky flex flex-row justify-between top-0 z-10 border-b py-3 px-5">
              {/* Title */}
              <h3 className="text-xl font-bold">{trait.title}</h3>

              {/* Close */}
              <button
                onClick={onClose}
                className="relative w-8 h-8 hover:scale-110 transform transition-transform duration-300"
              >
                <Image src="/icons/close.svg" alt="Close Icon" fill />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-3 px-5">
              {/* Quote */}
              <TraitQuote quote={trait.quote} />

              {/* Separator */}
              <Separator additionalClassNames="my-5" />

              {/* Paragraph */}
              <div className="text-sm lg:text-base w-full mb-5">
                {trait.description}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot
  );
}

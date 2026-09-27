import Image from "next/image";

import { TraitQuote as TraitQuoteInterface } from "@/data/traits";

interface TraitQuoteProps {
  quote: TraitQuoteInterface;
}

export default function TraitQuote({ quote }: TraitQuoteProps) {
  return (
    <div className="flex flex-row space-x-2 bg-gray-200 rounded-lg p-2 mx-5 mt-2">
      {/* Quote icon */}
      <div className="text-5xl font-mono w-10 h-10">
        <div className="relative w-10 h-10">
          <Image src="/icons/quote.svg" alt="Quote Icon" fill />
        </div>
      </div>

      {/* Quote */}
      <div className="text-sm lg:text-base text-gray-600 text-center w-5/6 mt-3">
        <p className="italic">{quote.text}</p>

        {/* Credit */}
        <p className="font-bold">
          ~
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={quote.authorLink}
            className="text-primary hover:underline"
          >
            {quote.author}
          </a>
        </p>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
} from '@heroicons/react/16/solid';

export default function Scroller() {
  const [showScroll, setShowScroll] = useState(false);
  const timeoutID = useRef<NodeJS.Timeout>();
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setShowScroll(true);
    clearTimeout(timeoutID.current);
    timeoutID.current = setTimeout(() => {
      setShowScroll(false);
    }, 2000);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={bottomRef}>
      <div
        className={`absolute right-2 transition-opacity duration-300 ${
          showScroll
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col fixed top-1/2 transform -translate-x-full -translate-y-1/2 space-y-2">
          <button
            className="bg-alternate text-white p-2 rounded-full hover:bg-white hover:text-alternate transition shadow-xl"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <ChevronDoubleUpIcon className="h-6 w-6 inline text-black" />
          </button>
          <button
            className="bg-alternate text-white p-2 rounded-full hover:bg-white hover:text-alternate transition shadow-xl"
            onClick={() => {
              if (bottomRef.current) {
                bottomRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <ChevronDoubleDownIcon className="h-6 w-6 inline text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}

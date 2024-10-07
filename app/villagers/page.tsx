'use client';

import Legend from './legend';
import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '@/lib/dataContext';
import Loading from '@/app/loading';
import VillagerCard from './villagerCard';
import nookipediaData from '@/lib/nookipediaData';
import {
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
} from '@heroicons/react/16/solid';

export default function Villagers() {
  const { historyMap } = useContext(DataContext);
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

  if (historyMap.size === 0) {
    return <Loading />;
  }

  return (
    <div className="relative">
      <Legend />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 justify-center">
        {Array.from(historyMap.values()).map((history) => (
          <VillagerCard
            key={history.name}
            history={history}
            villagerData={nookipediaData.get(history.name)!}
          />
        ))}
      </div>
      <div className="pb-4" ref={bottomRef}>
        <Legend />
      </div>
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

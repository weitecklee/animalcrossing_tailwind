'use client';

import { DataContext } from '@/lib/dataContext';
import { dateFormatter } from '@/lib/functions';
import nookipediaData from '@/lib/nookipediaData';
import { useContext } from 'react';
import Loading from './loading';
import Image from 'next/image';
import VillagerIcon from '@/components/villagerIcon';

const determinePronoun = (villager: string) =>
  nookipediaData.get(villager)!.gender === 'Male' ? 'his' : 'her';

const rewordEvent = (villager: string, event: string): string => {
  if (event === 'gave photo') {
    return `${villager} gave ${determinePronoun(villager)} photo`;
  }
  if (event === 'birthday') {
    return `${villager} celebrated ${determinePronoun(villager)} birthday`;
  }
  return `${villager} ${event}`;
};

export default function Events() {
  const { eventsData } = useContext(DataContext);

  if (eventsData.length === 0) {
    return <Loading />;
  }

  return (
    <div className="shadow-lg bg-white/30">
      <div className="flex justify-center">
        <div className="text-2xl font-bold">Latest Happenings</div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {eventsData.slice(0, 10).map((eventDatum) => {
          const { date, event, villager } = eventDatum;
          return (
            <div key={`${villager} ${event}`} className="flex items-center">
              <div className="flex items-center">
                <VillagerIcon villager={villager} />
                <div className="pl-2">{rewordEvent(villager, event)}</div>
              </div>
              <div className="pl-2">{dateFormatter(new Date(date))}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

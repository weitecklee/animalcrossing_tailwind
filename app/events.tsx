'use client';

import { DataContext } from '@/lib/dataContext';
import { dateFormatter } from '@/lib/functions';
import nookipediaData from '@/lib/nookipediaData';
import { useContext } from 'react';
import Loading from './loading';
import VillagerIcon from '@/components/villagerIcon';
import DividerWithText from '@/components/dividerWithText';

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
    <div className="shadow-lg bg-white/40 py-2 px-6 h-full overflow-auto">
      <DividerWithText text="Latest Happenings" />
      <div className="grid grid-cols-1 gap-2 pt-2">
        {eventsData.map((eventDatum) => {
          const { date, event, villager } = eventDatum;
          return (
            <div key={`${villager} ${event}`} className="flex items-center">
              <VillagerIcon villager={villager} />
              <div className="pl-2">
                <div>{rewordEvent(villager, event)}</div>
                <div className="text-sm text-gray-600">
                  {dateFormatter(new Date(date))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

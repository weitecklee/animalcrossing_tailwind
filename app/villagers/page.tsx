'use client';

import Legend from './legend';
import { useContext } from 'react';
import { DataContext } from '@/lib/dataContext';
import Loading from '@/app/loading';
import VillagerCard from './villagerCard';
import nookipediaData from '@/lib/nookipediaData';

export default function Villagers() {
  const { historyMap } = useContext(DataContext);

  if (historyMap.size === 0) {
    return <Loading />;
  }

  return (
    <div>
      <Legend />
      <div className="flex flex-wrap justify-center gap-4 py-4">
        {Array.from(historyMap.values()).map((history) => (
          <VillagerCard
            key={history.name}
            history={history}
            villagerData={nookipediaData.get(history.name)!}
          />
        ))}
      </div>
      <Legend />
    </div>
  );
}

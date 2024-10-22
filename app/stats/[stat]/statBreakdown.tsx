'use client';

import Loading from '@/app/loading';
import DividerWithText from '@/components/dividerWithText';
import IconGrid from '@/components/iconGrid';
import VillagerIcon from '@/components/villagerIcon';
import calculateStats from '@/lib/calculateStats';
import { DataContext } from '@/lib/dataContext';
import { notFound } from 'next/navigation';
import { useContext } from 'react';

function TitleChip({ title }: { title: string }) {
  return (
    <div className="text-xl font-coustard bg-alternate py-2 px-3 mb-2 rounded-full text-center">
      {title}
    </div>
  );
}

export default function StatBreakdown({
  params,
}: {
  params: { stat: string };
}) {
  const { historyMap } = useContext(DataContext);

  if (!historyMap.size) {
    return <Loading />;
  }

  const {
    speciesData,
    personalityData,
    genderData,
    // photoData,
    islandmatesData,
    // durationData,
    // noPhotoData,
  } = calculateStats(historyMap);

  switch (params.stat) {
    case 'lengthOfStay':
      return;
    case 'species':
      return (
        <>
          <TitleChip title="Species Breakdown" />
          {speciesData.map((traitData) => (
            <div key={traitData.trait}>
              <DividerWithText
                text={`${traitData.trait}: ${traitData.count}`}
              />
              <IconGrid traitData={traitData} />
            </div>
          ))}
        </>
      );
    case 'personality':
      return (
        <>
          <TitleChip title="Personality Breakdown" />
          {personalityData.map((traitData) => (
            <div key={traitData.trait}>
              <DividerWithText
                text={`${traitData.trait}: ${traitData.count}`}
              />
              <IconGrid traitData={traitData} />
            </div>
          ))}
        </>
      );
    case 'gender':
      return (
        <>
          <TitleChip title="Gender Breakdown" />
          {genderData.map((traitData) => (
            <div key={traitData.trait}>
              <DividerWithText
                text={`${traitData.trait}: ${traitData.count}`}
              />
              <IconGrid traitData={traitData} />
            </div>
          ))}
        </>
      );
    case 'photos':
      return;
    case 'islandmates':
      return (
        <>
          <TitleChip title="Islandmates Breakdown" />
          <ul>
            {islandmatesData.map((islandmates) =>
              islandmates.villagers.map((villager) => (
                <li key={villager}>
                  <div className="flex justify-center items-center gap-4">
                    <VillagerIcon villager={villager} />
                    <p>{islandmates.trait}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </>
      );
    default:
      return notFound();
  }
}

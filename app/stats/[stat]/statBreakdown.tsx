'use client';

import Loading from '@/app/loading';
import DividerWithText from '@/components/dividerWithText';
import IconGrid from '@/components/iconGrid';
import VillagerIcon from '@/components/villagerIcon';
import calculateStats from '@/lib/calculateStats';
import { DataContext } from '@/lib/dataContext';
import { dayOrDays } from '@/lib/functions';
import { notFound } from 'next/navigation';
import { useContext } from 'react';

function TitleChip({ title, textSize }: { title: string; textSize?: string }) {
  return (
    <div
      className={`text-${
        textSize || 'xl'
      } font-coustard bg-alternate py-2 px-3 mb-2 rounded-full text-center `}
    >
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
    photoData,
    islandmatesData,
    // durationData,
    noPhotoData,
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
      return (
        <>
          <TitleChip title="Photos Breakdown" />
          <div className="flex flex-row justify-center">
            <div>
              <TitleChip
                title="Time to give (stay after giving)"
                textSize="sm"
              />
              <ul>
                {photoData.map((photo) =>
                  photo.villagers.map((villager) => (
                    <li key={villager}>
                      <div className="flex justify-center items-center gap-4">
                        <VillagerIcon villager={villager} />
                        <p>{`${dayOrDays(photo.trait)} (${dayOrDays(
                          historyMap.get(villager)!.duration - photo.duration
                        )})`}</p>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="border-l border-gray-300 h-auto mx-4"></div>
            <div>
              <TitleChip title="Stay without giving" textSize="sm" />
              <ul>
                {noPhotoData.map((noPhoto) =>
                  noPhoto.villagers.map((villager) => (
                    <li key={villager}>
                      <div className="flex justify-center items-center gap-4">
                        <VillagerIcon villager={villager} />
                        <p>{dayOrDays(noPhoto.trait)}</p>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </>
      );
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

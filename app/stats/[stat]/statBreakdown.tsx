'use client';

import Loading from '@/app/loading';
import DividerWithText from '@/components/dividerWithText';
import IconGrid from '@/components/iconGrid';
import VillagerIcon from '@/components/villagerIcon';
import calculateStats from '@/lib/calculateStats';
import { DataContext } from '@/lib/dataContext';
import { dayOrDays } from '@/lib/functions';
import { Table } from 'flowbite-react';
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
    durationData,
    noPhotoData,
  } = calculateStats(historyMap);

  switch (params.stat) {
    case 'lengthOfStay':
      return (
        <>
          <TitleChip title="Length of Stay Breakdown" />
          <table className="w-full">
            <thead>
              <tr>
                <th scope="col" className="px-3 py-1">
                  Villager
                </th>
                <th scope="col" className="px-3 py-1">
                  Length of Stay (days)
                </th>
                <th scope="col" className="px-3 py-1">
                  Move-in Date
                </th>
                <th scope="col" className="px-3 py-1">
                  Move-out Date
                </th>
              </tr>
            </thead>
            <tbody>
              {durationData.map((duration) =>
                duration.villagers.map((villager) => {
                  const history = historyMap.get(villager)!;

                  return (
                    <tr key={villager} className="border-t hover:bg-white/40">
                      <td className="flex justify-center px-3 py-1.5">
                        <VillagerIcon villager={villager} />
                      </td>
                      <td className="text-center px-3 py-1.5">
                        {duration.duration}
                      </td>
                      <td className="text-center px-3 py-1.5">
                        {history.startDateString}
                      </td>
                      <td className="text-center px-3 py-1.5">
                        {history.currentResident ? '-' : history.endDateString}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </>
      );
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

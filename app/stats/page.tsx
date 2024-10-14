'use client';

import { DataContext } from '@/lib/dataContext';
import { useContext } from 'react';
import Loading from '../loading';
import calculateStats from '@/lib/calculateStats';
import IconGrid from '@/components/iconGrid';
import CRIcon from '@/components/crIcon';
import { dayOrDays } from '@/lib/functions';
export default function Stats() {
  const { historyMap } = useContext(DataContext);

  if (!historyMap.size) {
    return <Loading />;
  }

  const {
    speciesData,
    personalityData,
    genderData,
    photoData,
    photoStats,
    currentResidents,
    islandmatesData,
    durationData,
    photoStats2,
  } = calculateStats(historyMap);

  return (
    <>
      <div>
        <p>Number of villagers: {historyMap.size}</p>
        <div className="flex flex-row items-center">
          <CRIcon />
          <span>&ensp;Current Residents:</span>
        </div>
        <IconGrid villagers={currentResidents} />
      </div>
      <div>
        <h1 className="font-coustard">Length of Stay</h1>
        <p>
          Average:{' '}
          {(
            Array.from(historyMap.values()).reduce(
              (a, b) => a + b.duration,
              0
            ) / historyMap.size
          ).toFixed(2)}{' '}
          days
        </p>
        <p>Longest: {durationData[0].duration} days</p>
        <IconGrid traitData={durationData[0]} />
        <p>
          Shortest: {dayOrDays(durationData[durationData.length - 1].duration)}
        </p>
        <IconGrid traitData={durationData[durationData.length - 1]} />
      </div>
      <div>
        <h1 className="font-coustard">Species</h1>
        <p>Most common: {speciesData[0].trait}</p>
        <IconGrid traitData={speciesData[0]} />
      </div>
      <div>
        <h1 className="font-coustard">Personality</h1>
        <p>Most common: {personalityData[0].trait}</p>
        <IconGrid traitData={personalityData[0]} />
      </div>
      <div>
        <h1 className="font-coustard">Gender</h1>
        <p>
          {genderData[0].trait}: {genderData[0].count}
        </p>
        <p>
          {genderData[1].trait}: {genderData[1].count}
        </p>
      </div>
      <div>
        <h1 className="font-coustard">Photos</h1>
        <p>
          Given: {photoStats.count} (
          {((photoStats.count / historyMap.size) * 100).toFixed(2)}%)
        </p>
        <p>Average time to give: {photoStats.average.toFixed(2)} days</p>
        <p>Quickest: {photoData[0].trait} days</p>
        <IconGrid traitData={photoData[0]} />
        <p>Slowest: {photoData[photoData.length - 1].trait} days</p>
        <IconGrid traitData={photoData[photoData.length - 1]} />
        <p>
          Shortest stay after giving photo:{' '}
          {dayOrDays(photoStats2.shortestAfterGiving.duration - 1)}
        </p>
        <IconGrid traitData={photoStats2.shortestAfterGiving} />
        <p>
          Longest stay after giving photo:{' '}
          {dayOrDays(photoStats2.longestAfterGiving.duration - 1)}
        </p>
        <IconGrid traitData={photoStats2.longestAfterGiving} />
        <p>
          Longest stay without giving photo:{' '}
          {photoStats2.longestWithoutGiving.duration} days
        </p>
        <IconGrid traitData={photoStats2.longestWithoutGiving} />
      </div>
      <div>
        <h1 className="font-coustard">Islandmates</h1>
        <p>Most islandmates: {islandmatesData[0].trait}</p>
        <IconGrid traitData={islandmatesData[0]} />
        <p>
          Fewest islandmates:{' '}
          {islandmatesData[islandmatesData.length - 1].trait}
        </p>
        <IconGrid traitData={islandmatesData[islandmatesData.length - 1]} />
      </div>
    </>
  );
}

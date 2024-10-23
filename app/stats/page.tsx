'use client';

import { DataContext } from '@/lib/dataContext';
import { useContext } from 'react';
import Loading from '../loading';
import calculateStats from '@/lib/calculateStats';
import IconGrid from '@/components/iconGrid';
import CRIcon from '@/components/crIcon';
import { dayOrDays } from '@/lib/functions';
import Link from 'next/link';
import DividerWithText, {
  DividerWithTextProps,
} from '@/components/dividerWithText';
import { Tooltip } from 'flowbite-react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

function CustomDividerWithText(props: DividerWithTextProps) {
  return <DividerWithText {...props} className="pt-2 pb-1" />;
}

function BreakdownButton({ stat }: { stat: string }) {
  return (
    <Link href={`/stats/${stat}`}>
      <button className="bg-alternate text-sm font-coustard py-2 px-2 rounded-md hover:bg-white">
        Full Breakdown
      </button>
    </Link>
  );
}

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
        <CustomDividerWithText text="Length of Stay" />
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
        <BreakdownButton stat="lengthOfStay" />
      </div>
      <div>
        <CustomDividerWithText text="Species" />
        <p>Most common: {speciesData[0].trait}</p>
        <IconGrid traitData={speciesData[0]} />
        <BreakdownButton stat="species" />
      </div>
      <div>
        <CustomDividerWithText text="Personality" />
        <p>Most common: {personalityData[0].trait}</p>
        <IconGrid traitData={personalityData[0]} />
        <BreakdownButton stat="personality" />
      </div>
      <div>
        <CustomDividerWithText text="Gender" />
        <p>
          {genderData[0].trait}: {genderData[0].count}
        </p>
        <p>
          {genderData[1].trait}: {genderData[1].count}
        </p>
        <BreakdownButton stat="gender" />
      </div>
      <div>
        <CustomDividerWithText
          text="Photos"
          content={
            <Tooltip
              className="bg-alternate text-black"
              arrow={false}
              placement="bottom"
              content={
                <p className="max-w-80 font-montserrat font-normal text-base">
                  You can interact with villagers to raise your friendship level
                  with them, usually by talking to them, giving them gifts, or
                  completing tasks for them. Once this friendship level is high
                  enough, villagers may randomly give you their photo after
                  being gifted a high quality item. I usually try to wait till I
                  have received a villager&#39;s photo before I let them leave
                  the island.
                </p>
              }
            >
              <InformationCircleIcon className="h-4 w-4 cursor-pointer" />
            </Tooltip>
          }
        />
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
        <BreakdownButton stat="photos" />
      </div>
      <div>
        <CustomDividerWithText text="Islandmates" />
        <p>Most islandmates: {islandmatesData[0].trait}</p>
        <IconGrid traitData={islandmatesData[0]} />
        <p>
          Fewest islandmates:{' '}
          {islandmatesData[islandmatesData.length - 1].trait}
        </p>
        <IconGrid traitData={islandmatesData[islandmatesData.length - 1]} />

        <BreakdownButton stat="islandmates" />
      </div>
    </>
  );
}

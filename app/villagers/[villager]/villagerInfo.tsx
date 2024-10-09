'use client';

import Loading from '@/app/loading';
import CRIcon from '@/components/crIcon';
import CustomImage from '@/components/customImage';
import IconGrid from '@/components/iconGrid';
import { DataContext } from '@/lib/dataContext';
import { dateFormatter, dayOrDays, fixName } from '@/lib/functions';
import nookipediaData from '@/lib/nookipediaData';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useContext } from 'react';

export default function VillagerInfo({ villager }: { villager: string }) {
  const villagerName = fixName(villager);
  const villagerData = nookipediaData.get(villagerName);
  const { historyMap } = useContext(DataContext);

  if (!villagerData) {
    notFound();
  }

  const history = historyMap.get(villagerName);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 relative">
      <div className="col-span-12 sm:col-span-6 md:col-span-5 relative">
        <div className="flex flex-row space-x-2 w-full h-full relative">
          <div className="relative w-96 h-96 max-w-1/2 max-h-full">
            <CustomImage
              src={villagerData.image_url}
              alt={`${villagerData.name} image`}
              title={villagerData.name}
              fill
              blurColor={villagerData.title_color}
              key={villagerData.image_url}
            />
          </div>
          <div className="flex flex-col items-center max-w-1/2 max-h-full">
            <div className="relative w-32 h-32 max-w-full max-h-full">
              <CustomImage
                src={villagerData.nh_details.icon_url}
                alt={`${villagerData.name} icon`}
                title={villagerData.name}
                fill
                blurColor={villagerData.title_color}
                key={villagerData.nh_details.icon_url}
              />
            </div>
            <div className="relative w-64 h-64 max-w-full">
              <CustomImage
                src={villagerData.nh_details.photo_url}
                alt={`${villagerData.name} photo`}
                title={villagerData.name}
                fill
                blurColor={villagerData.title_color}
                key={villagerData.nh_details.photo_url}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-7">
        <div className="flex items-center">
          <h6 className="font-coustard text-xl">
            {villagerData.name}&ensp;{villagerData.ja_name}&ensp;
          </h6>
          {history && history.currentResident && <CRIcon />}
        </div>
        <p>
          {villagerData.personality} {villagerData.gender}{' '}
          {villagerData.species}
          <br />
          Birthday: {villagerData.birthday_month} {villagerData.birthday_day}
          <br />
          Quote:&nbsp;
          <span className="italic">
            &quot;{villagerData.nh_details.quote}&quot;
          </span>
          <br />
          Catchphrase:&nbsp;
          <span className="italic">
            &quot;{villagerData.nh_details.catchphrase}&quot;&ensp;「
            {villagerData.ja_phrase}」
          </span>
        </p>
        {!historyMap.size && <Loading />}
        {history && (
          <p>
            <br />
            Moved in on {dateFormatter(history.startDateDate)}
          </p>
        )}
        {history?.photo && (
          <p>
            Gave photo on {dateFormatter(history.photoDateDate)}
            <br />
            Time to give: {history.daysToPhoto} days
          </p>
        )}
        {history && !history?.currentResident && (
          <p>Moved out on {dateFormatter(history.endDateDate)}</p>
        )}
        {history && (
          <>
            <p>
              Length of stay:&nbsp;
              {dayOrDays(history.duration)}
              {history.currentResident && ' and counting'}
              <br />
              <br />
              {history.islandmates.length} islandmates:
            </p>
            <IconGrid villagers={history.islandmates} />
          </>
        )}
        <br />
        <p className="text-sm">
          <Link
            href={villagerData.url}
            target="_blank"
            rel="noopener"
            className="font-coustard text-inverse hover:underline"
          >
            Nookipedia page
            <ArrowTopRightOnSquareIcon className="h-4 w-4 inline" />
          </Link>
        </p>
      </div>
    </div>
  );
}

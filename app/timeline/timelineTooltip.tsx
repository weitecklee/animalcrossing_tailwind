'use client';

import CRBadge from '@/components/crBadge';
import IconWithText from '@/components/iconWithText';
import { dayOrDays, fixName, rgbDataURL } from '@/lib/functions';
import { History, NookipediaVillager } from '@/types';
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/16/solid';
import { ClockIcon } from '@heroicons/react/24/outline';
import { HandRaisedIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import Draggable from 'react-draggable';

export default function TimelineTooltip({
  villagerData,
  history,
}: {
  villagerData: NookipediaVillager;
  history: History;
}) {
  const nodeRef = useRef(null);

  return (
    <Draggable handle="#dragHandle" bounds="parent" nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        className="bg-alternate absolute top-1/2 left-[10%] p-4 rounded-lg shadow-lg"
      >
        <span
          id="dragHandle"
          className="absolute -top-3 -left-2 cursor-grab active:cursor-grabbing"
        >
          <HandRaisedIcon className="h-4 w-4 inline" />
        </span>
        <Link href={`/villagers/${fixName(history.name)}`}>
          <div className="cursor-pointer">
            <div className="relative">
              <Image
                src={villagerData.nh_details.icon_url}
                alt={villagerData.name}
                height={128}
                width={128}
                title={villagerData.name}
                placeholder="blur"
                blurDataURL={rgbDataURL(villagerData.title_color)}
                key={villagerData.nh_details.icon_url}
              />
              {history.currentResident && <CRBadge />}
            </div>
            <div className="font-coustard text-xl flex items-center">
              <span
                className="inline-block h-3 w-6 rounded-full border border-black"
                style={{ backgroundColor: `#${villagerData.title_color}` }}
              />
              <p>&ensp;{villagerData.name}</p>
            </div>
            <IconWithText
              Icon={ArrowRightEndOnRectangleIcon}
              text={history.startDateString}
            />
            {!history.currentResident && (
              <IconWithText
                Icon={ArrowRightStartOnRectangleIcon}
                text={history.endDateString}
              />
            )}
            <IconWithText Icon={ClockIcon} text={dayOrDays(history.duration)} />
          </div>
        </Link>
      </div>
    </Draggable>
  );
}

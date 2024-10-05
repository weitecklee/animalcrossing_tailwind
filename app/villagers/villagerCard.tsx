import CRIcon from '@/components/crIcon';
import CustomImage from '@/components/customImage';
import { History, NookipediaVillager } from '@/types';
import { useState } from 'react';
import IconWithText from '@/components/iconWithText';
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/16/solid';
import { ClockIcon, CameraIcon } from '@heroicons/react/24/outline';
import { dayOrDays } from '@/lib/functions';

export default function VillagerCard({
  history,
  villagerData,
}: {
  history: History;
  villagerData: NookipediaVillager;
}) {
  const [elevation, setElevation] = useState(false);

  return (
    <div
      className={`relative cursor-pointer bg-background transition-shadow ${
        elevation ? 'shadow-xl' : 'shadow-lg'
      }`}
      onMouseOver={() => setElevation(true)}
      onMouseOut={() => setElevation(false)}
    >
      <div className="">
        <div className={`flex flex-col md:flex-row`}>
          <div className={`relative max-w-full max-h-full h-40 w-80`}>
            <CustomImage
              src={villagerData.nh_details.photo_url}
              alt={`${history.name} photo`}
              title={history.name}
              fill
              blurColor={villagerData.title_color}
            />
          </div>
          <div className="relative w-1/2">
            <div className="flex items-center">
              <span className="font-[family-name:var(--font-coustard)] text-xl">
                {history.name}
              </span>
              {history.currentResident && <CRIcon />}
            </div>
            <IconWithText
              Icon={ArrowRightEndOnRectangleIcon}
              text={history.startDateString}
            />
            {history.photo && (
              <IconWithText Icon={CameraIcon} text={history.photoDateString} />
            )}
            {!history.currentResident && (
              <IconWithText
                Icon={ArrowRightStartOnRectangleIcon}
                text={history.endDateString}
              />
            )}
            <IconWithText Icon={ClockIcon} text={dayOrDays(history.duration)} />
          </div>
        </div>
      </div>
    </div>
  );
}

import CRIcon from '@/components/crIcon';
import CustomImage from '@/components/customImage';
import { History, NookipediaVillager } from '@/types';
import IconWithText from '@/components/iconWithText';
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/16/solid';
import { ClockIcon, CameraIcon } from '@heroicons/react/24/outline';
import { dayOrDays, fixName } from '@/lib/functions';
import Link from 'next/link';

export default function VillagerCard({
  history,
  villagerData,
}: {
  history: History;
  villagerData: NookipediaVillager;
}) {
  return (
    <Link href={`/villagers/${fixName(history.name)}`} scroll={false}>
      <div className="w-80 cursor-pointer bg-white/40 transition shadow-lg hover:shadow-xl hover:bg-white">
        <div className={`flex flex-col md:flex-row`}>
          <div className={`relative max-w-[50%] max-h-full h-40 w-80`}>
            <CustomImage
              src={villagerData.nh_details.photo_url}
              alt={`${history.name} photo`}
              title={history.name}
              fill
              blurColor={villagerData.title_color}
            />
          </div>
          <div className="relative w-1/2 p-2">
            <div className="flex items-center">
              <span className="font-coustard text-xl pr-2">{history.name}</span>
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
    </Link>
  );
}

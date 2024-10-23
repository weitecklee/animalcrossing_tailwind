import CRIcon from '@/components/crIcon';
import CustomImage from '@/components/customImage';
import { History, NookipediaVillager } from '@/types';
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
      <div className="w-28 md:w-80 cursor-pointer bg-white/40 transition shadow-lg hover:shadow-xl hover:bg-white">
        <div className={`flex flex-col md:flex-row`}>
          <div
            className={`relative w-28 h-28 md:max-w-[50%] md:max-h-full md:h-40 md:w-80`}
          >
            <CustomImage
              src={villagerData.nh_details.photo_url}
              alt={`${history.name} photo`}
              title={history.name}
              fill
              blurColor={villagerData.title_color}
            />
          </div>
          <div className="relative md:w-1/2 p-2">
            <table>
              <thead>
                <tr>
                  <td colSpan={2}>
                    <div className="font-coustard text-md md:text-xl flex items-center gap-1">
                      {history.name}
                      {history.currentResident ? <CRIcon /> : ''}
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody className="text-xs md:text-base">
                <tr>
                  <td className="pr-1.5">
                    <ArrowRightEndOnRectangleIcon className="h-4 w-4 inline" />
                  </td>
                  <td>{history.startDateString}</td>
                </tr>
                {history.photo && (
                  <tr>
                    <td className="pr-1.5">
                      <CameraIcon className="h-4 w-4 inline" />
                    </td>
                    <td>{history.photoDateString}</td>
                  </tr>
                )}
                {!history.currentResident && (
                  <tr>
                    <td className="pr-1.5">
                      <ArrowRightStartOnRectangleIcon className="h-4 w-4 inline" />
                    </td>
                    <td>{history.endDateString}</td>
                  </tr>
                )}
                <tr>
                  <td className="pr-1.5">
                    <ClockIcon className="h-4 w-4 inline" />
                  </td>
                  <td>{dayOrDays(history.duration)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Link>
  );
}

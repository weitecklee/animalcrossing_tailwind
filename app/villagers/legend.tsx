'use client';

import CRIcon from '@/components/crIcon';
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/16/solid';
import { ClockIcon, CameraIcon } from '@heroicons/react/24/outline';

export default function Legend() {
  return (
    <table>
      <tbody className="text-xs md:text-base">
        <tr>
          <td className="pr-1.5">
            <div className="flex items-center justify-center">
              <CRIcon />
            </div>
          </td>
          <td>Current Resident</td>
        </tr>
        <tr>
          <td className="pr-1.5">
            <ArrowRightEndOnRectangleIcon className="h-4 w-4 inline" />
          </td>
          <td>Move-in date</td>
        </tr>
        <tr>
          <td className="pr-1.5">
            <CameraIcon className="h-4 w-4 inline" />
          </td>
          <td>Photo date</td>
        </tr>
        <tr>
          <td className="pr-1.5">
            <ArrowRightStartOnRectangleIcon className="h-4 w-4 inline" />
          </td>
          <td>Move-out date</td>
        </tr>
        <tr>
          <td className="pr-1.5">
            <ClockIcon className="h-4 w-4 inline" />
          </td>
          <td>Length of Stay</td>
        </tr>
      </tbody>
    </table>
  );
}

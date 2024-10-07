'use client';

import CRIcon from '@/components/crIcon';
import IconWithText from '@/components/iconWithText';
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/16/solid';
import { ClockIcon, CameraIcon } from '@heroicons/react/24/outline';

export default function Legend() {
  return (
    <div>
      <div className="flex flex-row items-center">
        <CRIcon />
        <span>&ensp;Current Resident</span>
      </div>
      <IconWithText Icon={ArrowRightEndOnRectangleIcon} text="Move-in date" />
      <IconWithText Icon={CameraIcon} text="Photo date" />
      <IconWithText
        Icon={ArrowRightStartOnRectangleIcon}
        text="Move-out date"
      />
      <IconWithText Icon={ClockIcon} text="Length of Stay" />
    </div>
  );
}

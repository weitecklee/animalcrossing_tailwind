import IconWithText from '@/components/iconWithText';
import { DataContext } from '@/lib/dataContext';
import { dayOrDays, rgbDataURL } from '@/lib/functions';
import nookipediaData from '@/lib/nookipediaData';
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/16/solid';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Popover, PopoverProps } from 'flowbite-react';
import Image from 'next/image';
import { useContext, useRef, useState } from 'react';
import CRBadge from './crBadge';

interface VillagerTooltipProps extends Omit<PopoverProps, 'content'> {
  children: React.ReactNode;
  villager: string;
}

let noDelay = false;
let noDelayID: NodeJS.Timeout | null = null;

export default function VillagerTooltip({
  villager,
  children,
  ...props
}: VillagerTooltipProps) {
  const { historyMap } = useContext(DataContext);
  const villagerData = nookipediaData.get(villager)!;
  const history = historyMap.get(villager);

  const [open, setOpen] = useState(false);
  const timeoutID = useRef<NodeJS.Timeout | null>(null);

  return (
    <Popover
      {...props}
      aria-labelledby="villager-tooltip"
      content={
        <div className="bg-alternate p-4">
          <div className="relative">
            <Image
              src={villagerData.nh_details.icon_url}
              alt={villager}
              title={villager}
              height={128}
              width={128}
              style={{
                cursor: 'pointer',
              }}
              placeholder="blur"
              blurDataURL={rgbDataURL(villagerData.title_color)}
            />
            {history?.currentResident && <CRBadge />}
          </div>
          <p className="font-coustard text-lg">{villager}</p>
          {history && (
            <>
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
              <IconWithText
                Icon={ClockIcon}
                text={dayOrDays(history.duration)}
              />
            </>
          )}
        </div>
      }
      arrow={false}
      open={open}
      onOpenChange={setOpen}
    >
      <div
        onMouseEnter={() => {
          if (timeoutID.current) clearTimeout(timeoutID.current);
          if (noDelayID) clearTimeout(noDelayID);
          if (noDelay) {
            setOpen(true);
          } else {
            timeoutID.current = setTimeout(() => {
              noDelay = true;
              setOpen(true);
            }, 500);
          }
        }}
        onMouseLeave={() => {
          if (timeoutID.current) clearTimeout(timeoutID.current);
          if (noDelayID) clearTimeout(noDelayID);
          setOpen(false);
          noDelayID = setTimeout(() => {
            noDelay = false;
          }, 500);
        }}
      >
        {children}
      </div>
    </Popover>
  );
}

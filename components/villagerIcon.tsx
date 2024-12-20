import { DataContext } from '@/lib/dataContext';
import { fixName, rgbDataURL } from '@/lib/functions';
import nookipediaData from '@/lib/nookipediaData';
import Image from 'next/image';
import { useContext } from 'react';
import CRBadge from './crBadge';
import Link from 'next/link';
import VillagerTooltip from './villagerTooltip';
import { StateContext } from '@/lib/stateContext';

export default function VillagerIcon({ villager }: { villager: string }) {
  const { historyMap } = useContext(DataContext);
  const villagerData = nookipediaData.get(villager)!;
  const isResident = historyMap.has(villager);
  const { modalActive } = useContext(StateContext);

  return (
    <Link
      href={`/villagers/${fixName(villager)}`}
      replace={modalActive}
      scroll={false}
    >
      <VillagerTooltip villager={villager}>
        <div className="relative w-12 h-12 md:w-16 md:h-16">
          <Image
            src={villagerData.nh_details.icon_url}
            alt={villager}
            title={villager}
            fill
            style={{
              cursor: 'pointer',
              opacity: isResident ? 1 : 0.4,
            }}
            placeholder="blur"
            blurDataURL={rgbDataURL(villagerData.title_color)}
          />
          {historyMap.get(villager)?.currentResident && <CRBadge />}
        </div>
      </VillagerTooltip>
    </Link>
  );
}

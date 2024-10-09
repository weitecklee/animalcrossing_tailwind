import { DataContext } from '@/lib/dataContext';
import { rgbDataURL } from '@/lib/functions';
import nookipediaData from '@/lib/nookipediaData';
import Image from 'next/image';
import { useContext } from 'react';
import CRBadge from './crBadge';
import Link from 'next/link';

export default function VillagerIcon({ villager }: { villager: string }) {
  const { historyMap } = useContext(DataContext);
  const villagerData = nookipediaData.get(villager)!;
  const isResident = historyMap.has(villager);

  return (
    <Link href={`/villagers/${villager}`}>
      <div className="relative">
        <Image
          src={villagerData.nh_details.icon_url}
          alt={villager}
          title={villager}
          height={64}
          width={64}
          style={{
            cursor: 'pointer',
            opacity: isResident ? 1 : 0.4,
          }}
          placeholder="blur"
          blurDataURL={rgbDataURL(villagerData.title_color)}
        />
        {historyMap.get(villager)?.currentResident && <CRBadge />}
      </div>
    </Link>
  );
}

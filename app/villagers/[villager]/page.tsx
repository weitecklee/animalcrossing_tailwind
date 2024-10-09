import { NAMES } from '@/lib/constants';
import { fixName } from '@/lib/functions';
import VillagerInfo from './villagerInfo';

export const dynamicParams = false;

export function generateStaticParams() {
  return NAMES.map((name) => ({ villager: fixName(name) }));
}

export default function VillagerPage({
  params,
}: {
  params: { villager: string };
}) {
  return <VillagerInfo villager={params.villager} />;
}

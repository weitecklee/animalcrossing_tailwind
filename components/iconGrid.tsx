import { Trait } from '@/types';
import VillagerIcon from './villagerIcon';

export default function IconGrid({
  traitData,
  villagers,
}: {
  traitData?: Trait;
  villagers?: string[];
}) {
  return (
    <div className="grid grid-flow-row-dense grid-cols-[repeat(auto-fit,minmax(64px,1fr))] gap-1 py-2">
      {villagers!.map((villager) => (
        <VillagerIcon villager={villager} />
      ))}
    </div>
  );
}

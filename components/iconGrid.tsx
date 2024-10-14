import { Trait } from '@/types';
import VillagerIcon from './villagerIcon';

export default function IconGrid({
  traitData,
  villagers,
}: {
  traitData?: Trait;
  villagers?: string[];
}) {
  if (!!traitData) {
    return (
      <div className="flex flex-wrap gap-1 py-1">
        {traitData.villagers.map((villager) => (
          <VillagerIcon key={villager} villager={villager} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1 py-1">
      {villagers!.map((villager) => (
        <VillagerIcon key={villager} villager={villager} />
      ))}
    </div>
  );
}

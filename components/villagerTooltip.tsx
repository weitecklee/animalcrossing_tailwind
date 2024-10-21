import { DataContext } from '@/lib/dataContext';
import nookipediaData from '@/lib/nookipediaData';
import { Popover, PopoverProps } from 'flowbite-react';
import { useContext } from 'react';

interface VillagerTooltipProps extends Omit<PopoverProps, 'content'> {
  children: React.ReactNode;
  villager: string;
}

export default function VillagerTooltip({
  villager,
  children,
  ...props
}: VillagerTooltipProps) {
  const { historyMap } = useContext(DataContext);
  const villagerData = nookipediaData.get(villager);
  const history = historyMap.get(villager);

  return (
    <Popover
      {...props}
      aria-labelledby="villager-tooltip"
      content={
        <div>
          <p>{villager}</p>
        </div>
      }
      trigger="hover"
    >
      {children}
    </Popover>
  );
}

import { HeroIcon } from '@/types';

export default function IconWithText({
  Icon,
  text,
}: {
  Icon: HeroIcon;
  text: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="h-4 w-4 inline" />
      <span className="text-xs md:text-base">&ensp;{text}</span>
    </div>
  );
}

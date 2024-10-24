import Image from 'next/image';
import AvatarPNG from '@/public/avatar13.png';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid';
import Events from './events';

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row-reverse gap-4">
      <div className="flex-full h-[33dvh] md:flex-1/3 md:h-full">
        <Events />
      </div>
      <div className="flex-full md:flex-2/3">
        <p className="text-xl">Hello there!</p>
        <p className="mt-2">
          This is a site I made to showcase my&nbsp;
          <span className="italic">Animal Crossing: New Horizons</span> island.
          <br />
          <br />
          You can find the following pages and information:
          <br />
          &emsp;&emsp;
          <span className="font-coustard">Villagers</span>
          : all the villagers that have been on my island
          <br />
          &emsp;&emsp;
          <span className="font-coustard">Timeline</span>
          : a timeline chart of the villagers&apos; stays
          <br />
          &emsp;&emsp;
          <span className="font-coustard">Stats</span>
          : all sorts of fun stats
          <br />
          &emsp;&emsp;
          <span className="font-coustard">Search</span>
          : find villagers by traits
          <br />
          &emsp;&emsp;
          <span className="font-coustard">About</span>
          : info about the game and me
          <br />
          <br />
          Enjoy your visit!
        </p>
        <div className="py-8">
          <Image
            src={AvatarPNG}
            alt="My Villager"
            priority
            className="w-[90vw] max-w-[376px] h-auto"
          />
        </div>
        <p className="text-sm">
          Special thanks to:
          <br />
          &emsp;&emsp;
          <Link
            href="https://www.nintendo.com/store/products/animal-crossing-new-horizons-switch/"
            target="_blank"
            rel="noreferrer"
            className="font-coustard text-inverse hover:underline"
          >
            Nintendo
            <ArrowTopRightOnSquareIcon className="h-4 w-4 inline" />
          </Link>
          &nbsp;for making the Animal Crossing video games
          <br />
          &emsp;&emsp;
          <Link
            href="https://nookipedia.com/"
            target="_blank"
            rel="noopener"
            className="font-coustard text-inverse hover:underline"
          >
            Nookipedia
            <ArrowTopRightOnSquareIcon className="h-4 w-4 inline" />
          </Link>
          &nbsp;for providing all the villager data and media
          <br />
          <br />
          Made by&nbsp;
          <Link
            href="https://github.com/weitecklee"
            target="_blank"
            rel="noreferrer"
            className="font-coustard text-inverse hover:underline"
          >
            weitecklee
            <ArrowTopRightOnSquareIcon className="h-4 w-4 inline" />
          </Link>
        </p>
      </div>
    </div>
  );
}

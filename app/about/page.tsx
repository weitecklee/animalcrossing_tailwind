import NHLogo from '@/public/NH_Logo.png';
import AvatarPNG from '@/public/avatar02.png';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="max-w-[80rem] flex flex-col items-center gap-4">
      <Image
        src={NHLogo}
        alt="Animal Crossing: New Horizons logo"
        style={{
          width: '90vw',
          maxWidth: 500,
          height: 'auto',
          margin: 'auto',
        }}
      />
      <p>
        <span className="italic">Animal Crossing: New Horizons</span>
        &nbsp;is a simulation game made by Nintendo. In it, the player develops
        and customizes their own island, building facilities and decorating the
        landscape as they choose, as well as inviting anthropomorphic animals to
        join as residents (a.k.a. villagers). The island can have up to 10 of
        these villagers at a time living on it.
      </p>
      <Image
        src={AvatarPNG}
        alt="My Villager"
        priority
        style={{
          width: '90vw',
          maxWidth: 200,
          height: 'auto',
          margin: 'auto',
        }}
      />
      <p>
        I have been playing&nbsp;
        <span className="italic">Animal Crossing: New Horizons</span>
        &nbsp;since its release on March 20, 2020. These days, I&apos;m mostly
        playing out of habit and my own weird interest in recordkeeping and
        statistics. I keep my own records of my gameplay, noting when villagers
        come and go and when they give me their photos. All the other villager
        information (species, personality, etc.) is provided by&nbsp;
        <Link
          href="https://nookipedia.com/"
          target="_blank"
          rel="noopener"
          className="font-coustard text-inverse hover:underline"
        >
          Nookipedia
          <ArrowTopRightOnSquareIcon className="h-4 w-4 inline" />
        </Link>
        .
      </p>
    </div>
  );
}

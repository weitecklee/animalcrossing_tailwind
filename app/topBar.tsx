import Image from 'next/image';
import Link from 'next/link';
import FavIcon from '@/public/lasagnark8.png';
import { Bars3Icon } from '@heroicons/react/16/solid';
import { Dropdown, DropdownItem } from 'flowbite-react';

const pages = ['Villagers', 'Timeline', 'Stats', 'Search', 'About'];
export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 py-2 px-4 bg-alternate text-black font-coustard shadow-md">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="md:hidden">
            <Dropdown
              label={<Bars3Icon className="h-6 w-6" />}
              arrowIcon={false}
              inline
              className="bg-alternate border-alternate"
            >
              {pages.map((page) => (
                <DropdownItem
                  key={page}
                  as={Link}
                  href={`/${page.toLowerCase()}`}
                >
                  {page}
                </DropdownItem>
              ))}
            </Dropdown>
          </div>
          <Link href="/">
            <div className="hover:bg-white p-1 rounded-full">
              <Image src={FavIcon} alt="logo" height={45} />
            </div>
          </Link>
          <Link href="/">
            <h1 className="text-lg md:text-2xl font-bold">
              My Animal Crossing Island
            </h1>
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            {pages.map((page) => (
              <Link key={page} href={`/${page.toLowerCase()}`}>
                <li className="hover:bg-white p-2 rounded">{page}</li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

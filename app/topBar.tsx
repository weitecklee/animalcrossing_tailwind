import Image from "next/image";
import Link from "next/link";
import FavIcon from "@/public/lasagnark8.png";

const pages = ["Villagers", "Timeline", "Stats", "Search", "About"];

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 py-2 px-4 bg-alternate text-black font-[family-name:var(--font-coustard)] shadow-md ">
      <div className="max-w-7xl mx-auto flex justify-between items-center ">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="hover:bg-background p-1 rounded-full">
              <Image src={FavIcon} alt="logo" height={45} />
            </div>
          </Link>
          <Link href="/">
            <h1 className="text-2xl font-bold">My Animal Crossing Island</h1>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            {pages.map((page) => (
              <li key={page} className="hover:bg-background p-2 rounded">
                {<Link href={`/${page.toLowerCase()}`}>{page}</Link>}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

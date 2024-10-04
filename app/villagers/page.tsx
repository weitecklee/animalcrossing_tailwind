'use client';

import Legend from './legend';
import { useContext } from 'react';
import { DataContext } from '@/lib/dataContext';
import Loading from '@/app/loading';

export default function Villagers() {
  const { historyMap } = useContext(DataContext);
  // const [showScroll, setShowScroll] = useState(false);
  // const timeoutID = useRef<NodeJS.Timeout>();
  // const bottomRef = useRef<HTMLDivElement>();

  // const handleScroll = () => {
  //   setShowScroll(true);
  //   clearTimeout(timeoutID.current);
  //   timeoutID.current = setTimeout(() => {
  //     setShowScroll(false);
  //   }, 2000);
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  if (!!historyMap.size) {
    return (
      <div className="relative">
        <Legend />
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 justify-center">
          {Array.from(historyMap.values()).map((history) => (
            <VillagerCard
              key={history.name}
              history={history}
              villagerData={nookipediaData.get(history.name)!}
            />
          ))}
        </div> */}
        <div>
          <Legend />
        </div>

        {/* {showScroll && (
          <div className="absolute right-2">
            <div className="flex flex-col fixed top-1/2 transform -translate-x-full -translate-y-1/2 space-y-2">
              <button
                className="bg-secondary text-white p-2 rounded-full hover:bg-white hover:text-secondary transition"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <ChevronDoubleUpIcon />
              </button>
              <button
                className="bg-secondary text-white p-2 rounded-full hover:bg-white hover:text-secondary transition"
                onClick={() => {
                  bottomRef.current.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <ChevronDoubleDownIcon />
              </button>
            </div>
          </div>
        )} */}
      </div>
    );
  }
  return <Loading />;
}

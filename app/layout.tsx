import type { Metadata } from 'next';
import { Coustard, Montserrat } from 'next/font/google';
import './globals.css';
import TopBar from './topBar';
import { DataProvider } from '@/lib/dataContext';
import Scroller from '@/components/scroller';

const montserrat = Montserrat({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-montserrat',
});
const coustard = Coustard({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-coustard',
});

export const metadata: Metadata = {
  title: 'My Animal Crossing Island',
  description:
    'Showcase of my Animal Crossing: New Horizons island and its villagers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${coustard.variable} antialiased`}
      >
        <DataProvider>
          <div className="container mx-auto max-w-[1400px] px-4 mt-20 pb-4 relative">
            <TopBar />
            {children}
            <Scroller />
          </div>
        </DataProvider>
      </body>
    </html>
  );
}

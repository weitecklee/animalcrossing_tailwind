'use client';

import Image from 'next/image';
import ErrorPNG from '@/public/avatar19.png';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  console.log(error);
  return (
    <div className="flex flex-col items-center h-screen">
      <p className="text-lg">Seems like something went wrong...</p>
      <Image
        src={ErrorPNG}
        alt="Confused"
        priority
        style={{
          width: '90vw',
          maxWidth: 309,
          height: 'auto',
        }}
      />
    </div>
  );
}

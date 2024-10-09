import Image from 'next/image';
import ErrorPNG from '@/public/avatar19.png';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center h-screen">
      <p className="text-lg">There doesn&#39;t seem to be anything here...</p>
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

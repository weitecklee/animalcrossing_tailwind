'use client';

import { Modal } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import StatBreakdown from '@/app/stats/[stat]/statBreakdown';
import { XMarkIcon } from '@heroicons/react/16/solid';

export default function StatModal({ params }: { params: { stat: string } }) {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return (
    <Modal show={true} dismissible onClose={handleClose} position="center">
      <Modal.Body className="bg-background rounded-lg relative">
        <StatBreakdown params={params} />
        <button
          className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-alternate p-2 rounded-full"
          onClick={handleClose}
        >
          <XMarkIcon className="h-6 w-6 text-black" />
        </button>
      </Modal.Body>
    </Modal>
  );
}

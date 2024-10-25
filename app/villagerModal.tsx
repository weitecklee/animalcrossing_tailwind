'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef } from 'react';
import { StateContext } from '@/lib/stateContext';
import { Modal } from 'flowbite-react';
import VillagerInfo from './villagers/[villager]/villagerInfo';
import { XMarkIcon } from '@heroicons/react/16/solid';

export default function VillagerModal() {
  const router = useRouter();
  const { modalActive, modalVillager } = useContext(StateContext);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView();
    }
  }, [modalVillager, modalActive]);

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal
      show={modalActive}
      size="7xl"
      dismissible
      onClose={handleClose}
      position="center"
    >
      <Modal.Body className="bg-background rounded-lg relative">
        <div ref={topRef} />
        <VillagerInfo villager={modalVillager} />
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

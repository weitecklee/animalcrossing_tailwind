'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { StateContext } from '@/lib/stateContext';
import { Modal } from 'flowbite-react';
import VillagerInfo from './villagers/[villager]/villagerInfo';

export default function VillagerModal() {
  const router = useRouter();
  const { modalActive, modalVillager } = useContext(StateContext);

  return (
    <Modal
      show={modalActive}
      size="7xl"
      dismissible
      onClose={() => {
        router.back();
      }}
      position="center"
    >
      <Modal.Body>
        <VillagerInfo villager={modalVillager} />
      </Modal.Body>
    </Modal>
  );
}

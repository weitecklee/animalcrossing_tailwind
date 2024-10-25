'use client';

import { useContext, useEffect } from 'react';
import { StateContext } from '@/lib/stateContext';

export default function VillagerModal({
  params,
}: {
  params: { villager: string };
}) {
  const { setModalActive, setModalVillager } = useContext(StateContext);

  useEffect(() => {
    setModalActive(true);
    return () => {
      setModalActive(false);
    };
  }, [setModalActive]);

  useEffect(() => {
    setModalVillager(params.villager);
  }, [setModalVillager, params]);

  return <></>;
}

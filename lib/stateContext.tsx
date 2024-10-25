'use client';

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

export const StateContext = createContext({
  modalActive: false,
  setModalActive: () => {},
  modalVillager: '',
  setModalVillager: () => {},
} as {
  modalActive: boolean;
  setModalActive: Dispatch<SetStateAction<boolean>>;
  modalVillager: string;
  setModalVillager: Dispatch<SetStateAction<string>>;
});

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [modalActive, setModalActive] = useState(false);
  const [modalVillager, setModalVillager] = useState('');

  return (
    <StateContext.Provider
      value={{
        modalActive,
        setModalActive,
        modalVillager,
        setModalVillager,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

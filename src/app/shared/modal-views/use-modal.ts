'use client';

import { atom, useAtomValue, useSetAtom } from 'jotai';

type ModalTypes = {
  view: React.ReactNode | null ;
  isOpen: boolean;
  customSize?: string;
};

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: null,
  customSize: '320px',
});

export function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);

  const openModal = ({
    view,
    customSize,
  }: {
    view: React.ReactNode;
    customSize?: string;
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      customSize,
    });
  };

  const closeModal = () => {
    setState({
      ...state,
      isOpen: false,
      view: null,
    });
  };

  return {
    ...state,
    openModal,
    closeModal,
  };
}

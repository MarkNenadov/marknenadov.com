import { useState, useCallback } from 'react';

/**
 * Custom hook for managing modal state
 * Provides open/close functionality with proper TypeScript typing
 */
export function useModal(initialState: boolean = false) {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  } as const;
}

/**
 * Custom hook for managing multiple modal states
 * Useful when a component has multiple modals
 */
export function useModals<T extends string>(modalNames: readonly T[]) {
  const [modals, setModals] = useState<Record<T, boolean>>(
    modalNames.reduce((acc, name) => {
      acc[name] = false;
      return acc;
    }, {} as Record<T, boolean>)
  );

  const openModal = useCallback((modalName: T) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  }, []);

  const closeModal = useCallback((modalName: T) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  }, []);

  const toggleModal = useCallback((modalName: T) => {
    setModals(prev => ({ ...prev, [modalName]: !prev[modalName] }));
  }, []);

  const isModalOpen = useCallback((modalName: T) => {
    return modals[modalName];
  }, [modals]);

  return {
    isModalOpen,
    openModal,
    closeModal,
    toggleModal,
  } as const;
}
/**
 * Base interface for modal components
 */
export interface BaseModalProps {
  onClose: () => void;
}

/**
 * Generic modal handler type for closing modals
 */
export type ModalCloseHandler = () => void;

/**
 * Modal state management interface
 */
export interface ModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}
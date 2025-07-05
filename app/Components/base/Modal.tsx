import React, { ReactNode } from 'react';
import GenericButton from './GenericButton';

interface ModalContextValue {
  onClose: () => void;
}

const ModalContext = React.createContext<ModalContextValue | null>(null);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

interface ModalOverlayProps {
  children: ReactNode;
  className?: string;
}

interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
}

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

interface ModalFooterProps {
  children?: ReactNode;
  showDefaultCloseButton?: boolean;
  className?: string;
}

/**
 * Compound Modal component with better composition
 * Usage:
 * <Modal isOpen={isOpen} onClose={onClose}>
 *   <Modal.Overlay>
 *     <Modal.Content>
 *       <Modal.Header>Title</Modal.Header>
 *       <Modal.Body>Content</Modal.Body>
 *       <Modal.Footer />
 *     </Modal.Content>
 *   </Modal.Overlay>
 * </Modal>
 */
function ModalRoot({ isOpen, onClose, children, className = '' }: ModalProps) {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ onClose }}>
      <div className={`fixed inset-0 z-50 ${className}`}>
        {children}
      </div>
    </ModalContext.Provider>
  );
}

function ModalOverlay({ children, className = '' }: ModalOverlayProps) {
  const context = React.useContext(ModalContext);
  
  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in ${className}`}
      onClick={context?.onClose}
    >
      {children}
    </div>
  );
}

function ModalContent({ children, className = '' }: ModalContentProps) {
  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className={`bg-white p-8 rounded-3xl shadow-elegant-lg border border-border-primary text-center max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] animate-scale-in opacity-100 ${className}`}
    >
      {children}
    </div>
  );
}

function ModalHeader({ children, className = '' }: ModalHeaderProps) {
  return (
    <h2 className={`text-2xl font-semibold mb-6 text-text-primary ${className}`}>
      {children}
    </h2>
  );
}

function ModalBody({ children, className = '' }: ModalBodyProps) {
  return (
    <div className={`text-left text-text-secondary ${className}`}>
      {children}
    </div>
  );
}

function ModalFooter({ children, showDefaultCloseButton = true, className = '' }: ModalFooterProps) {
  const context = React.useContext(ModalContext);

  return (
    <div className={`mt-6 ${className}`}>
      {children}
      {showDefaultCloseButton && context && (
        <GenericButton 
          text="Close" 
          onClick={context.onClose} 
          dataTestId="close-button"
        />
      )}
    </div>
  );
}

// Compound component pattern
export const Modal = Object.assign(ModalRoot, {
  Overlay: ModalOverlay,
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
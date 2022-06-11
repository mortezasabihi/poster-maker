import { FC } from 'react';
import { createPortal } from 'react-dom';
import useKeyDown from '~/src/hooks/useKeyDown';

type Size = 'sm' | 'md' | 'lg';

interface IProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  size?: Size;
  heading?: string;
}

const ModalContent: FC<Required<Pick<IProps, 'children' | 'size'>>> = ({ children, size }) => {
  /**
   * Size Class
   * @returns {string}
   */
  const sizeClass = (): string => {
    switch (size) {
      case 'lg':
        return 'sm:w-1/2';
      case 'md':
        return 'md:w-1/3';
      case 'sm':
        return 'lg:w-1/4';
      default:
        return '';
    }
  };

  return (
    <div
      tabIndex={-1}
      className={`relative m-auto flex w-full flex-col rounded-lg border bg-white p-4 shadow-lg ${sizeClass()}`}
    >
      <div>{children}</div>
    </div>
  );
};

const ModalCloseButton: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <button
      type="button"
      role={'button'}
      className="absolute top-0 right-0 m-4 h-6 w-6 rounded-full border border-gray-300 bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
      onClick={onClose}
      title="close"
    >
      <svg
        className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
      </svg>
    </button>
  );
};

const ModalHeading: FC<Required<Pick<IProps, 'heading' | 'onClose'>>> = ({ heading, onClose }) => {
  return (
    <div role={'heading'} className="flex items-center justify-between px-4 py-2">
      <h2 className="text-2xl font-bold">{heading}</h2>
      <ModalCloseButton onClose={onClose} />
    </div>
  );
};

const ModalBody: FC<Required<Pick<IProps, 'children' | 'onClose'>>> = ({ children, onClose }) => {
  /**
   * Handle Close
   * @param e {MouseEvent}
   * @returns {void}
   */
  const handleOnClose = (e: React.MouseEvent): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useKeyDown('Escape', onClose);

  return (
    <div
      role={'dialog'}
      className="fixed inset-0 z-50 flex overflow-auto backdrop-blur-sm"
      onClick={handleOnClose}
    >
      {children}
    </div>
  );
};

const Modal: FC<IProps> = ({ children, open, size = 'md', onClose, heading }) => {
  return createPortal(
    <>
      {open && (
        <ModalBody onClose={onClose}>
          <ModalContent size={size}>
            {heading && <ModalHeading heading={heading} onClose={onClose} />}
            <div className="p-4">{children}</div>
          </ModalContent>
        </ModalBody>
      )}
    </>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;

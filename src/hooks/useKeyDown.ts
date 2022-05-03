import { useEffect } from 'react';

/**
 * useKeyDown hook
 * @param callback {Function}
 * @returns {void}
 */
const useEsc = (key: KeyboardEvent['key'], callback: () => void): void => {
  useEffect(() => {
    const escHandler = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };

    document.addEventListener('keydown', escHandler);

    return () => {
      document.removeEventListener('keydown', escHandler);
    };
  }, [callback, key]);
};

export default useEsc;

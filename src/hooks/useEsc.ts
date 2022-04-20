import { useEffect } from 'react';

/**
 * useEsc
 * @param callback {Function}
 * @returns {void}
 */
const useEsc = (callback: () => void): void => {
  useEffect(() => {
    const escHandler = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        callback();
      }
    };

    document.addEventListener('keydown', escHandler);

    return () => {
      document.removeEventListener('keydown', escHandler);
    };
  }, [callback]);
};

export default useEsc;

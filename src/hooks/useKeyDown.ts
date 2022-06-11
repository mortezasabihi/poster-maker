import { useEffect } from 'react';

/**
 * useKeyDown hook
 * @param callback {Function}
 * @returns {void}
 */
const useKeyDown = (key: KeyboardEvent['key'], callback: () => void): void => {
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [callback, key]);
};

export default useKeyDown;

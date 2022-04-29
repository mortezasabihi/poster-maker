import { useEffect, useState, useCallback } from 'react';

/**
 * useKeyPress hook
 * @param targetKey {string}
 * @returns {boolean}
 */
const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === targetKey) {
        setKeyPressed(true);
      }
    },
    [targetKey]
  );

  const upHandler = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey]
  );

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]);

  return keyPressed;
};

export default useKeyPress;

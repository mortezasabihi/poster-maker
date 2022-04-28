import { nanoid } from 'nanoid/non-secure';

/**
 * Generates a random HEX color
 * @returns {string}
 */
export const generateRandomRGBColor = (): string => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Generate a Random ID
 * @param size {number}
 * @returns {string}
 */
export const generateRandomId = (size = 10): string => nanoid(size);

/**
 *
 * @param width {number}
 * @param height {number}
 * @returns {'landscape' | 'portrait'}
 */
export const getOrientation = (width: number, height: number): 'landscape' | 'portrait' => {
  if (width > height) {
    return 'landscape';
  }

  return 'portrait';
};

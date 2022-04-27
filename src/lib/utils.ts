import { nanoid } from 'nanoid/non-secure';

/**
 * Generates a random HEX color
 * @returns {string}
 */
export const generateRandomHexColor = (): string =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

/**
 * Generate a Random ID
 * @param size {number}
 * @returns {string}
 */
export const generateRandomId = (size = 10): string => nanoid(size);

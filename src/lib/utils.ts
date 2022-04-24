/**
 * Generates a random HEX color
 * @returns {string}
 */
export const generateRandomHexColor = (): string =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

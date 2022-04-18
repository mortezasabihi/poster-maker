/**
 * Generates a random HEX color
 * @returns {string}
 */
// eslint-disable-next-line import/prefer-default-export
export const generateRandomHexColor = (): string =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

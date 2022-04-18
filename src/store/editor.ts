import { atom, selector } from 'recoil';

export interface IConfig {
  backgroundColor: string;
  size: {
    width: number;
    height: number;
  } | null;
}

export const configState = atom<IConfig>({
  key: 'configState',
  default: {
    backgroundColor: '#fff',
    size: null
  }
});

export const configSelector = selector({
  key: 'configSelector',
  get: ({ get }) => {
    const config = get(configState);
    return config;
  }
});

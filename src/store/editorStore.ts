import create from 'zustand';
import { generateRandomHexColor } from '~/src/lib/utils';

interface EditorStore {
  drawingMode: boolean;
  color: string;
  toggleDrawingMode: () => void;
  setColor: (color: string) => void;
}

const useStore = create<EditorStore>((set) => ({
  drawingMode: false,
  color: generateRandomHexColor(),
  toggleDrawingMode: () => set((state) => ({ ...state, drawingMode: !state.drawingMode })),
  setColor: (color) => set((state) => ({ ...state, color }))
}));

export default useStore;

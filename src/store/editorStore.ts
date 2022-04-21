import create from 'zustand';
import { generateRandomHexColor } from '~/src/lib/utils';
import { Tool } from '~/src/types/editor';

interface EditorStore {
  activeTool: Tool | null;
  color: string;

  setActiveTool: (tool: Tool | null) => void;
  setColor: (color: string) => void;
}

const useStore = create<EditorStore>((set) => ({
  activeTool: null,
  color: generateRandomHexColor(),

  setActiveTool: (tool) => set((state) => ({ ...state, activeTool: tool })),
  setColor: (color) => set((state) => ({ ...state, color }))
}));

export default useStore;

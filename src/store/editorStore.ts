import create from 'zustand';
import { generateRandomHexColor } from '~/src/lib/utils';
import { Tool } from '~/src/types/editor';

interface EditorStore {
  activeTool: Tool | null;
  color: string;
  activeObject: any | null;
  activeObjectType: string | null;

  setActiveTool: (tool: Tool | null) => void;
  setColor: (color: string) => void;
  setActiveObject: (object: fabric.Object | null) => void;
}

const useStore = create<EditorStore>((set) => ({
  activeTool: null,
  color: generateRandomHexColor(),
  activeObject: null,
  activeObjectType: null,

  setActiveTool: (tool) => set((state) => ({ ...state, activeTool: tool })),
  setColor: (color) => set((state) => ({ ...state, color })),
  setActiveObject: (object) =>
    set((state) => ({ ...state, activeObject: object, activeObjectType: object?.type || null }))
}));

export default useStore;

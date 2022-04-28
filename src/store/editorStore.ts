import create from 'zustand';
import { generateRandomRGBColor } from '~/src/lib/utils';
import type { Tool } from '~/src/types/editor';

interface EditorStore {
  canvas: fabric.Canvas | null;
  activeTool: Tool | null;
  color: string;
  activeObject: any | null;
  activeObjectType: string | null;
  layers: fabric.Object[];

  setCanvas(canvas: fabric.Canvas): void;
  setActiveTool: (tool: Tool | null) => void;
  setColor: (color: string) => void;
  setActiveObject: (object: fabric.Object | null) => void;
  addLayer: (layer: fabric.Object) => void;
  removeLayer: (name: string) => void;
  updateLayer: (name: string, layer: fabric.Object) => void;
}

const useStore = create<EditorStore>((set) => ({
  canvas: null,
  activeTool: null,
  color: generateRandomRGBColor(),
  activeObject: null,
  activeObjectType: null,
  layers: [],

  setCanvas: (canvas) => set((state) => ({ ...state, canvas })),
  setActiveTool: (tool) => set((state) => ({ ...state, activeTool: tool })),
  setColor: (color) => set((state) => ({ ...state, color })),
  setActiveObject: (object) =>
    set((state) => ({ ...state, activeObject: object, activeObjectType: object?.type || null })),
  addLayer: (layer) => set((state) => ({ ...state, layers: [...state.layers, layer] })),
  removeLayer: (name) =>
    set((state) => ({ ...state, layers: state.layers.filter((layer) => layer.name !== name) })),
  updateLayer: (name, layer) =>
    set((state) => ({
      ...state,
      layers: state.layers.map((l) => (l.name === name ? layer : l))
    }))
}));

export default useStore;

import create from 'zustand';
import { generateRandomRGBColor } from '~/src/lib/utils';
import type { FileWithPreview, Tool } from '~/src/types/editor';

interface EditorStore {
  canvas: fabric.Canvas | null;
  activeTool: Tool | null;
  color: string;
  activeObject: any | null;
  activeObjectType: string | null;
  layers: fabric.Object[];
  backgroundImage: FileWithPreview | null;

  setCanvas(canvas: fabric.Canvas): void;
  setActiveTool: (tool: Tool | null) => void;
  setColor: (color: string) => void;
  setActiveObject: (object: fabric.Object | null) => void;
  addLayer: (layer: fabric.Object) => void;
  removeLayer: (name: string) => void;
  updateLayer: (name: string, layer: fabric.Object) => void;
  updateLayers: (dragName: string, hoverName: string) => void;
  setBackgroundImage: (image: FileWithPreview | null) => void;
}

const useStore = create<EditorStore>((set) => ({
  canvas: null,
  activeTool: null,
  color: generateRandomRGBColor(),
  activeObject: null,
  activeObjectType: null,
  layers: [],
  backgroundImage: null,

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
    })),
  updateLayers: (dragName, hoverName) =>
    set((state) => {
      const layers = [...state.layers];
      const dragLayerIndex = layers.findIndex((layer) => layer.name === dragName);
      const hoverLayerIndex = layers.findIndex((layer) => layer.name === hoverName);

      layers.splice(hoverLayerIndex, 0, layers.splice(dragLayerIndex, 1)[0]);

      return { ...state, layers };
    }),
  setBackgroundImage: (image) => set((state) => ({ ...state, backgroundImage: image }))
}));

export default useStore;

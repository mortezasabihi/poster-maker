export type Shape = 'rect' | 'circle' | 'triangle' | 'hexagon' | 'octagon';

export type Tool = 'pen' | 'line';

export enum EDITOR_CANVAS_EVENTS {
  CHANGE_BG_COLOR = 'CHANGE_BG_COLOR',
  ADD_SHAPE = 'ADD_SHAPE',
  ADD_TEXT = 'ADD_TEXT'
}

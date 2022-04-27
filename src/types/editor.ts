export type Shape = 'rect' | 'circle' | 'triangle' | 'hexagon' | 'octagon';

export type Tool = 'pen' | 'line';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export type FontStyle = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'overline';

export type ActivePanel = 'object' | 'layer';

export enum EDITOR_CANVAS_EVENTS {
  CHANGE_BG_COLOR = 'CHANGE_BG_COLOR',
  ADD_SHAPE = 'ADD_SHAPE',
  ADD_TEXT = 'ADD_TEXT',
  UPDATE_OBJECT = 'UPDATE_OBJECT',
  SELECT_OBJECT = 'SELECT_OBJECT',
  LOCK_OBJECT = 'LOCK_OBJECT',
  HIDE_OBJECT = 'HIDE_OBJECT'
}

export interface TextPayload {
  fontFamily: string;
  fontSize: number;
  textAlign: TextAlign;
  fontStyle: FontStyle[];
}

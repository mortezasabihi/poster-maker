export type Shape = 'rect' | 'circle' | 'triangle' | 'hexagon' | 'octagon';

export type Tool = 'pen' | 'line';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export type FontStyle = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'overline';

export type ActivePanel = 'object' | 'layer' | 'artboard';

export type FileWithPreview = File & { preview: string };

export enum EDITOR_CANVAS_EVENTS {
  CHANGE_BG_COLOR = 'CHANGE_BG_COLOR',
  ADD_SHAPE = 'ADD_SHAPE',
  ADD_TEXT = 'ADD_TEXT',
  UPDATE_OBJECT = 'UPDATE_OBJECT',
  MODIFY_OBJECT = 'MODIFY_OBJECT',
  SELECT_OBJECT = 'SELECT_OBJECT',
  LOCK_OBJECT = 'LOCK_OBJECT',
  HIDE_OBJECT = 'HIDE_OBJECT',
  UPDATE_CANVAS = 'UPDATE_CANVAS',
  UPDATE_OBJECT_ORDER = 'UPDATE_OBJECT_ORDER',
  HANDLE_LINE_DRAWED = 'HANDLE_LINE_DRAWED'
}

export interface TextPayload {
  fontFamily: string;
  fontSize: number;
  textAlign: TextAlign;
  fontStyle: FontStyle[];
}

export interface ShapePayload {
  size: {
    width: number;
    height: number;
  };
  rotation: number;
  stroke: {
    color: string;
    width: number;
  };
}

export interface LinePayload {
  size: {
    width: number;
    height: number;
  };
  rotation: number;
  stroke: {
    color: string;
    width: number;
  };
}

export type ObjectPayload = TextPayload | ShapePayload | LinePayload;

export interface CanvasPayload {
  backgroundColor: string;
  size: {
    width: number;
    height: number;
  };
  orientation: 'landscape' | 'portrait';
  backgroundImage: string;
}

export interface ObjectOrderPayload {
  dragName: string;
  hoverName: string;
  dragIndex: number;
  hoverIndex: number;
}

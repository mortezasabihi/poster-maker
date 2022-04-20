import { FC, createContext, useReducer, Dispatch, useMemo } from 'react';
import { generateRandomHexColor } from '~/src/lib/utils';

enum ActionType {
  TOGGLE_DRAWING_MODE = 'TOGGLE_DRAWING_MODE',
  SET_CURRENT_COLOR = 'SET_CURRENT_COLOR'
}
interface IToggleDrawingMode {
  type: ActionType.TOGGLE_DRAWING_MODE;
}
interface ISetCurrentColor {
  type: ActionType.SET_CURRENT_COLOR;
  payload: string;
}
type Actions = IToggleDrawingMode | ISetCurrentColor;

export const toggleDrawingMode = (): IToggleDrawingMode => ({
  type: ActionType.TOGGLE_DRAWING_MODE
});
export const setCurrentColor = (color: string): ISetCurrentColor => ({
  type: ActionType.SET_CURRENT_COLOR,
  payload: color
});

interface IStoreState {
  drawingMode: boolean;
  color: string;
}
interface IEditorContext {
  state: IStoreState;
  dispatch: Dispatch<Actions>;
}

const initalState: IStoreState = {
  drawingMode: false,
  color: generateRandomHexColor()
};

export const EditorContext = createContext<IEditorContext>({
  state: initalState,
  dispatch: () => null
});

const reducer = (state: IStoreState, action: Actions) => {
  switch (action.type) {
    case ActionType.TOGGLE_DRAWING_MODE:
      return {
        ...state,
        drawingMode: !state.drawingMode
      };
    case ActionType.SET_CURRENT_COLOR:
      return {
        ...state,
        color: action.payload
      };
    default:
      return state;
  }
};

export const EditorContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const store = useMemo(() => ({ state, dispatch }), [state]);

  return <EditorContext.Provider value={store}>{children}</EditorContext.Provider>;
};

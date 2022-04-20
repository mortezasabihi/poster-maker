import { createContext, useReducer, Dispatch } from 'react';

enum ActionType {
  TOGGLE_DRAWING_MODE = 'TOGGLE_DRAWING_MODE'
}
interface IToggleDrawingMode {
  type: ActionType.TOGGLE_DRAWING_MODE;
}
type Actions = IToggleDrawingMode;

export const toggleDrawingMode = (): IToggleDrawingMode => ({
  type: ActionType.TOGGLE_DRAWING_MODE
});

interface IStoreState {
  drawingMode: boolean;
}
interface IEditorContext {
  state: IStoreState;
  dispatch: Dispatch<Actions>;
}

const initalState: IStoreState = {
  drawingMode: false
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
    default:
      return state;
  }
};

export const EditorContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  return <EditorContext.Provider value={{ state, dispatch }}>{children}</EditorContext.Provider>;
};

import { FC, useReducer, useEffect } from 'react';
import useStore from '~/src/store/editorStore';
import { EDITOR_CANVAS_EVENTS, CanvasPayload } from '~/src/types/editor';
import { getOrientation } from '~/src/lib/utils';
import { dispatch as busDispatch } from '~/src/hooks/useBus';
import BackgroundColorSelector from './BackgroundColorSelector';
import BackgroundImageSelector from './BackgroundImageSelector';
import OrientationSelector from './OrientationSelector';
import { SizeSelector } from '~/src/components/global';

type Actions =
  | { type: 'setBackgroundColor'; payload: CanvasPayload['backgroundColor'] }
  | { type: 'setSize'; payload: CanvasPayload['size'] }
  | { type: 'setOrientation'; payload: CanvasPayload['orientation'] }
  | { type: 'setBackgroundImage'; payload: CanvasPayload['backgroundImage'] };

const ArtboardPanel: FC = () => {
  const { canvas } = useStore();

  const initialState: CanvasPayload = {
    backgroundColor: canvas?.backgroundColor as string,
    size: {
      width: canvas?.width as number,
      height: canvas?.height as number
    },
    orientation: getOrientation(canvas?.width as number, canvas?.height as number),
    backgroundImage: ''
  };
  console.log(initialState);

  /**
   * Reducer
   * @param state {CanvasPayload}
   * @param action {Actions}
   * @returns {CanvasPayload}
   */
  const reducer = (state: CanvasPayload, action: Actions): CanvasPayload => {
    switch (action.type) {
      case 'setBackgroundColor':
        return { ...state, backgroundColor: action.payload };
      case 'setSize':
        return { ...state, size: action.payload };
      case 'setOrientation':
        return {
          ...state,
          orientation: action.payload,
          size: { width: state.size.height, height: state.size.width }
        };
      case 'setBackgroundImage':
        return { ...state, backgroundImage: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    busDispatch({
      type: EDITOR_CANVAS_EVENTS.UPDATE_CANVAS,
      payload: state
    });
  }, [state]);

  return (
    <form className="flex-1 p-5">
      <div className="grid grid-cols-2 gap-x-8">
        <BackgroundColorSelector
          value={state.backgroundColor}
          onChange={(v) => dispatch({ type: 'setBackgroundColor', payload: v })}
        />
        <OrientationSelector
          value={state.orientation}
          onChange={(v) => dispatch({ type: 'setOrientation', payload: v })}
        />
      </div>

      <BackgroundImageSelector
        value={state.backgroundImage}
        onChange={(v) => dispatch({ type: 'setBackgroundImage', payload: v })}
      />

      <SizeSelector
        value={state.size}
        onChange={(v) => dispatch({ type: 'setSize', payload: v })}
      />
    </form>
  );
};

export default ArtboardPanel;

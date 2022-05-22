import { FC, useReducer, useEffect } from 'react';
import useStore from '~/src/store/editorStore';
import { LinePayload, EDITOR_CANVAS_EVENTS } from '~/src/types/editor';
import useBus, { dispatch as busDispatch } from '~/src/hooks/useBus';
import { SizeSelector, StrokeSelector, RotationSelector } from '~/src/components/global';

type Actions =
  | { type: 'setStroke'; payload: LinePayload['stroke'] }
  | { type: 'setSize'; payload: LinePayload['size'] }
  | { type: 'setRotation'; payload: LinePayload['rotation'] };

const LinePanel: FC = () => {
  const { activeObject } = useStore();

  const initialState: LinePayload = {
    size: {
      width: (activeObject.width as number) * (activeObject.scaleX as number),
      height: (activeObject.height as number) * (activeObject.scaleY as number)
    },
    rotation: activeObject?.angle || 0,
    stroke: {
      color: activeObject.stroke,
      width: activeObject.strokeWidth
    }
  };

  /**
   * Reducer
   * @param state {LinePayload}
   * @param action {Actions}
   * @returns {LinePayload}
   */
  const reducer = (state: LinePayload, action: Actions): LinePayload => {
    switch (action.type) {
      case 'setSize':
        return { ...state, size: action.payload };
      case 'setRotation':
        return { ...state, rotation: action.payload };
      case 'setStroke':
        return { ...state, stroke: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    busDispatch({
      type: EDITOR_CANVAS_EVENTS.UPDATE_OBJECT,
      payload: state
    });
  }, [state]);

  /**
   * Handle Line Drawed
   * @param payload {fabric.Line}
   * @returns {void}
   */
  const handleLineDrawed = (payload: fabric.Line): void => {
    const { width, height, scaleX, scaleY } = payload;
    if (!width || !height || !scaleX || !scaleY) return;
    dispatch({
      type: 'setSize',
      payload: {
        width: width * scaleX,
        height: height * scaleY
      }
    });
  };

  useBus<{ payload: fabric.Line }>(EDITOR_CANVAS_EVENTS.HANDLE_LINE_DRAWED, ({ payload }) =>
    handleLineDrawed(payload)
  );

  /**
   * Handle Modify Object
   * @param payload {fabric.Object}
   * @returns {void}
   */
  const handleModifyObject = ({ width, height, angle, scaleX, scaleY }: fabric.Object): void => {
    if (width && height && scaleX && scaleY) {
      dispatch({ type: 'setSize', payload: { width: width * scaleX, height: height * scaleY } });
    }
    dispatch({ type: 'setRotation', payload: angle || 0 });
  };

  useBus<{ payload: fabric.Object }>(EDITOR_CANVAS_EVENTS.MODIFY_OBJECT, ({ payload }) =>
    handleModifyObject(payload)
  );

  return (
    <form>
      <div className="grid grid-cols-12 gap-x-5">
        <div className="md:col-span-6 2xl:col-span-8">
          <SizeSelector
            value={state.size}
            onChange={(v) => dispatch({ type: 'setSize', payload: v })}
          />
        </div>
        <div className="md:col-span-6 2xl:col-span-4">
          <RotationSelector
            value={state.rotation}
            onChange={(v) => dispatch({ type: 'setRotation', payload: v })}
          />
        </div>
      </div>

      <div>
        <StrokeSelector
          value={state.stroke}
          onChange={(v) => dispatch({ type: 'setStroke', payload: v })}
        />
      </div>
    </form>
  );
};

export default LinePanel;

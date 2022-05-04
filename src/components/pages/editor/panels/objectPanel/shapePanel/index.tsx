import { FC, useReducer, useEffect } from 'react';
import { ShapePayload, EDITOR_CANVAS_EVENTS } from '~/src/types/editor';
import useStore from '~/src/store/editorStore';
import useBus, { dispatch as busDispatch } from '~/src/hooks/useBus';
import { SizeSelector } from '~/src/components/global';
import RotationSelector from './RotationSelector';
import StrokeSelector from './StrokeSelector';

type Actions =
  | { type: 'setSize'; payload: ShapePayload['size'] }
  | { type: 'setRotation'; payload: ShapePayload['rotation'] }
  | { type: 'setStroke'; payload: ShapePayload['stroke'] };

const ShapePanel: FC = () => {
  const { activeObject } = useStore();

  const intialState: ShapePayload = {
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
   * @param state {ShapePayload}
   * @param action {Actions}
   * @returns {ShapePayload}
   */
  const reducer = (state: ShapePayload, action: Actions): ShapePayload => {
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

  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    busDispatch({
      type: EDITOR_CANVAS_EVENTS.UPDATE_OBJECT,
      payload: state
    });
  }, [state]);

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

export default ShapePanel;

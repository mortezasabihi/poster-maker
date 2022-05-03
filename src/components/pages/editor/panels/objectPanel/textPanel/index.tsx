import { FC, useReducer, useEffect } from 'react';
import useStore from '~/src/store/editorStore';
import { dispatch as busDispatch } from '~/src/hooks/useBus';
import { EDITOR_CANVAS_EVENTS, TextPayload, TextAlign, FontStyle } from '~/src/types/editor';
import FontFamilySelector from './FontFamilySelector';
import FontSizeInput from './FontSizeInput';
import TextAlignSelector from './TextAlignSelector';
import FontStyleSelector from './FontStyleSelector';

type Actions =
  | { type: 'setFontFamily'; payload: TextPayload['fontFamily'] }
  | { type: 'setFontSize'; payload: TextPayload['fontSize'] }
  | { type: 'setTextAlign'; payload: TextPayload['textAlign'] }
  | { type: 'setFontStyle'; payload: TextPayload['fontStyle'] };

const TextPanel: FC = () => {
  const activeObject = useStore<fabric.IText>((state) => state.activeObject);

  /**
   * Font Styles
   * @returns {FontStyle[]}
   */
  const fontStyle = (): FontStyle[] => {
    const styles = new Set<FontStyle>([
      activeObject.fontStyle as FontStyle,
      activeObject.fontWeight as FontStyle
    ]);

    if (activeObject.underline) styles.add('underline');
    if (activeObject.linethrough) styles.add('strikethrough');
    if (activeObject.overline) styles.add('overline');

    return [...styles];
  };

  const initialState: TextPayload = {
    fontFamily: activeObject?.fontFamily as string,
    fontSize: activeObject?.fontSize as number,
    textAlign: activeObject?.textAlign as TextAlign,
    fontStyle: fontStyle()
  };

  /**
   * Reducer
   * @param state {TextPayload}
   * @param action {Actions}
   * @returns {TextPayload}
   */
  const reducer = (state: TextPayload, action: Actions): TextPayload => {
    switch (action.type) {
      case 'setFontFamily':
        return { ...state, fontFamily: action.payload };
      case 'setFontSize':
        return { ...state, fontSize: action.payload };
      case 'setTextAlign':
        return { ...state, textAlign: action.payload };
      case 'setFontStyle':
        return { ...state, fontStyle: action.payload };
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

  return (
    <form>
      <FontFamilySelector
        value={state.fontFamily}
        onChange={(v) => dispatch({ type: 'setFontFamily', payload: v })}
      />

      <div className="grid grid-cols-12 gap-x-8">
        <div className="md:col-span-4 2xl:col-span-5">
          <FontSizeInput
            value={state.fontSize}
            onChange={(v) => dispatch({ type: 'setFontSize', payload: v })}
          />
        </div>
        <div className="md:col-span-8 2xl:col-span-7">
          <TextAlignSelector
            value={state.textAlign}
            onChange={(v) => dispatch({ type: 'setTextAlign', payload: v })}
          />
        </div>
      </div>

      <FontStyleSelector
        value={state.fontStyle}
        onChange={(v) => dispatch({ type: 'setFontStyle', payload: v })}
      />
    </form>
  );
};

export default TextPanel;

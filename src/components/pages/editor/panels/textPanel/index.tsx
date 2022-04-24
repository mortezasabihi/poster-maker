import type { FC } from 'react';
import { useFormik } from 'formik';
import useStore from '~/src/store/editorStore';
import { dispatch } from '~/src/hooks/useBus';
import { EDITOR_CANVAS_EVENTS, TextPayload, TextAlign, FontStyle } from '~/src/types/editor';
import FontFamilySelector from './FontFamilySelector';
import FontSizeInput from './FontSizeInput';
import TextAlignSelector from './TextAlignSelector';
import FontStyleSelector from './FontStyleSelector';

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

  const formik = useFormik<TextPayload>({
    initialValues: {
      fontFamily: activeObject.fontFamily as string,
      fontSize: activeObject.fontSize as number,
      textAlign: activeObject.textAlign as TextAlign,
      fontStyle: fontStyle()
    },
    onSubmit: (values) => {
      dispatch({
        type: EDITOR_CANVAS_EVENTS.UPDATE_OBJECT,
        payload: {
          fontFamily: values.fontFamily,
          fontSize: values.fontSize,
          textAlign: values.textAlign,
          fontStyle: values.fontStyle
        }
      });
    }
  });

  return (
    <form>
      <FontFamilySelector
        value={formik.values.fontFamily}
        onChange={(v) => {
          formik.setFieldValue('fontFamily', v);
          formik.submitForm();
        }}
      />

      <div className="grid grid-cols-12 gap-x-8">
        <div className="md:col-span-4 2xl:col-span-5">
          <FontSizeInput
            value={formik.values.fontSize}
            onChange={(v) => {
              formik.setFieldValue('fontSize', v);
              formik.submitForm();
            }}
          />
        </div>
        <div className="md:col-span-8 2xl:col-span-7">
          <TextAlignSelector
            value={formik.values.textAlign}
            onChange={(v) => {
              formik.setFieldValue('textAlign', v);
              formik.submitForm();
            }}
          />
        </div>
      </div>

      <FontStyleSelector
        value={formik.values.fontStyle}
        onChange={(v) => {
          formik.setFieldValue('fontStyle', v);
          formik.submitForm();
        }}
      />
    </form>
  );
};

export default TextPanel;

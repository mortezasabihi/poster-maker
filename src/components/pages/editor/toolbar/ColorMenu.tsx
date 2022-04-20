import { FC, useContext, useState, useCallback, useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { EditorContext, setCurrentColor } from '~/src/context/EditorContext';
import useClickOutside from '~/src/hooks/useClickOutside';
import useEsc from '~/src/hooks/useEsc';

const ColorMenu: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { state, dispatch } = useContext(EditorContext);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));
  useEsc(() => setOpen(false));

  /**
   * Handle Color Change
   * @param color {string}
   * @returns void
   */
  const handleColorChange = useCallback(
    (color: string) => {
      dispatch(setCurrentColor(color));
    },
    [dispatch]
  );

  return (
    <div ref={ref} className="relative">
      <ul className="w-full">
        <li>
          <button
            title={state.color.toUpperCase()}
            className="mx-auto my-2 block h-9 w-9 rounded text-center focus:ring-0"
            style={{
              backgroundColor: state.color
            }}
            onClick={() => setOpen(true)}
          />
        </li>
      </ul>

      {open && (
        <div className="absolute left-full top-2 z-50 ml-3 rounded-lg bg-white p-4 shadow-xl">
          <HexColorPicker color={state.color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default ColorMenu;

import { FC, useState, useRef } from 'react';
import useStore from '~/src/store/editorStore';
import useClickOutside from '~/src/hooks/useClickOutside';
import useEsc from '~/src/hooks/useEsc';
import { ColorPicker } from '~/src/components/global';

const ColorMenu: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const color = useStore((state) => state.color);
  const setColor = useStore((dispatch) => dispatch.setColor);

  useClickOutside(ref, () => setOpen(false));
  useEsc(() => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <ul className="w-full">
        <li>
          <button
            title={color.toUpperCase()}
            className="mx-auto my-2 block h-9 w-9 rounded text-center focus:ring-0"
            style={{
              backgroundColor: color
            }}
            onClick={() => setOpen(true)}
          />
        </li>
      </ul>

      {open && (
        <div className="absolute left-full top-2 z-50 ml-3 rounded-lg bg-white p-4 shadow-xl">
          <ColorPicker value={color} onChange={setColor} />
        </div>
      )}
    </div>
  );
};

export default ColorMenu;

import { FC, useId, useState, useRef } from 'react';
import useClickOutside from '~/src/hooks/useClickOutside';
import { ColorPicker } from '~/src/components/global';

interface IProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const BackgroundColorSelector: FC<IProps> = ({ value, onChange }) => {
  const id = useId();
  const [checked, setChecked] = useState<boolean>(!!value);
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>(value || '#fff');
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  /**
   * Handle Checkbox Change
   * @returns {void}
   */
  const handleCheckboxChange = (): void => {
    setChecked(!checked);

    if (checked) {
      setOpen(false);
      onChange('');
    } else {
      onChange(color);
    }
  };

  /**
   * Handle Change
   * @param colorValue {string}
   * @returns {void}
   */
  const handleChange = (colorValue: string): void => {
    setColor(colorValue);
    onChange(colorValue);
  };

  return (
    <div className="py-3">
      <label htmlFor={id}>Background Color</label>

      <div className="relative flex items-center">
        <input
          type="checkbox"
          name="bgColor"
          id={id}
          checked={checked}
          onChange={handleCheckboxChange}
        />

        <div ref={ref}>
          <button
            onClick={() => setOpen(true)}
            disabled={!checked}
            style={{ backgroundColor: color }}
            className="my-2 ml-4 h-9 w-9 rounded border shadow-sm focus:border-inherit focus:ring-0"
            title={color.toUpperCase()}
            type="button"
          />

          {open && (
            <div className="absolute -top-4 z-50 ml-20 rounded-lg bg-white p-4 shadow-xl">
              <ColorPicker value={color} onChange={handleChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackgroundColorSelector;

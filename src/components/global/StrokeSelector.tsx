import { FC, useId, useState, useRef } from 'react';
import useClickOutside from '~/src/hooks/useClickOutside';
import { ColorPicker } from '~/src/components/global';

interface Stroke {
  color: string;
  width: number;
}

interface IProps {
  value: Stroke;
  onChange: (value: Stroke) => void;
  checkable?: boolean;
}

const StrokeSelector: FC<IProps> = ({ value, onChange, checkable }) => {
  const id = useId();
  const inputId = useId();

  const [checked, setChecked] = useState<boolean>(!!value.color);
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>(value.color || 'rgba(255,255,255,1)');
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
      onChange({
        color: '',
        width: 1
      });
      setColor('');
    } else {
      onChange({
        color,
        width: value.width
      });
    }
  };

  /**
   * Handle Change
   * @param colorValue {string}
   * @returns {void}
   */
  const handleChange = (colorValue: string): void => {
    setColor(colorValue);
    onChange({
      color: colorValue,
      width: value.width
    });
  };

  /**
   * Handle Input Width Change
   * @param e {React.MouseEvent<HTMLInputElement>}
   * @returns {void}
   */
  const handleInputWidthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange({
      color: value.color,
      width: Number(e.target.value)
    });
  };

  return (
    <div className="py-3">
      <label htmlFor={id}>Stroke</label>

      <div className="flex items-center justify-between">
        <div className="relative flex items-center">
          {checkable && (
            <input
              type="checkbox"
              name="bgColor"
              id={id}
              checked={checked}
              onChange={handleCheckboxChange}
              className="mr-4"
            />
          )}

          <div ref={ref}>
            <button
              onClick={() => setOpen(true)}
              disabled={!checked}
              style={{ backgroundColor: color }}
              className="my-2 h-9 w-9 rounded border shadow-sm focus:border-inherit focus:ring-0"
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

        {checked && (
          <div>
            <label htmlFor={inputId} className="mb-0 flex w-40 items-center">
              <span className="mr-2 text-xs text-gray-400">W</span>

              <input
                type="number"
                name="width"
                id={inputId}
                value={value.width}
                min={0}
                onChange={handleInputWidthChange}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrokeSelector;

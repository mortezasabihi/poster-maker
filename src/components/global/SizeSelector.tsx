import { FC, useId } from 'react';

interface Size {
  width: number;
  height: number;
}

interface IProps {
  value: Size;
  onChange: (value: Size) => void;
}

const SizeSelector: FC<IProps> = ({ value, onChange }) => {
  const widthId = useId();
  const heightId = useId();

  /**
   * Handle Change
   * @param e {React.ChangeEvent<HTMLInputElement>}
   * @returns {void}
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value: v } = e.target;

    if (name === 'width') {
      onChange({
        ...value,
        width: Number(v)
      });
    } else if (name === 'height') {
      onChange({
        ...value,
        height: Number(v)
      });
    }
  };

  return (
    <div className="py-3">
      <label>Size</label>

      <div className="grid grid-cols-2 gap-x-2">
        <label htmlFor={widthId} className="flex items-center">
          <span className="mr-2 text-xs text-gray-400">W</span>
          <input
            type="number"
            name="width"
            id={widthId}
            value={value.width}
            onChange={handleChange}
          />
        </label>
        <label htmlFor={heightId} className="flex items-center">
          <span className="mr-2 text-xs text-gray-400">H</span>
          <input
            type="number"
            name="height"
            id={heightId}
            value={value.height}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
};

export default SizeSelector;

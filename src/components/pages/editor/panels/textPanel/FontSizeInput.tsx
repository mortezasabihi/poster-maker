import { FC, useId } from 'react';

interface IProps {
  value: number | undefined;
  onChange: (value: number) => void;
}

const FontSizeInput: FC<IProps> = ({ value, onChange }) => {
  const id = useId();

  return (
    <div className="py-3">
      <label htmlFor={id}>Font Size (PX)</label>

      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};

export default FontSizeInput;

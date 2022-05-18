import { FC, useId } from 'react';

interface IProps {
  value: number | undefined;
  onChange: (value: number) => void;
}

const RotationSelector: FC<IProps> = ({ value, onChange }) => {
  const id = useId();

  return (
    <div className="py-3">
      <label htmlFor={id} title="Rotation" className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 h-4 w-4 stroke-current text-gray-600"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5" />
        </svg>{' '}
        (°)
      </label>

      <input
        id={id}
        type="number"
        max={360}
        min={-360}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        name="rotation"
      />
    </div>
  );
};

export default RotationSelector;

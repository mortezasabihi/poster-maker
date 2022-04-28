import type { FC } from 'react';
import { RgbaStringColorPicker } from 'react-colorful';

interface IProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const ColorPicker: FC<IProps> = ({ value, onChange }) => {
  return <RgbaStringColorPicker color={value} onChange={onChange} />;
};

export default ColorPicker;

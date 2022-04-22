import type { FC } from 'react';
import { HexColorPicker } from 'react-colorful';

interface IProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const ColorPicker: FC<IProps> = ({ value, onChange }) => {
  return <HexColorPicker color={value} onChange={onChange} />;
};

export default ColorPicker;

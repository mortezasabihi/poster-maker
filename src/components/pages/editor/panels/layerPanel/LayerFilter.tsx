import type { FC } from 'react';
import FormSelect, { Option } from '~/src/components/global/FormSelect';

interface IProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const LayerFilter: FC<IProps> = ({ value, onChange }) => {
  const options: Option[] = [
    { value: 'all', label: 'All' },
    { value: 'images', label: 'Images' },
    { value: 'text', label: 'Text' },
    { value: 'shapes', label: 'Shapes' }
  ];

  return <FormSelect label="Filter" options={options} value={value} onChange={onChange} />;
};

export default LayerFilter;

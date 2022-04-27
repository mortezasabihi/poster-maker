import { FC } from 'react';
import FormSelect, { Option, StyleType } from '~/src/components/global/FormSelect';

interface IProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const FontFamilySelector: FC<IProps> = ({ value, onChange }) => {
  const fonts: Option[] = [
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times', label: 'Times' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier', label: 'Courier' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Copperplate Gothic', label: 'Copperplate Gothic' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Palatino', label: 'Palatino' },
    { value: 'Book Antiqua', label: 'Book Antiqua' },
    { value: 'Comic Sans', label: 'Comic Sans' },
    { value: 'Trebuchet', label: 'Trebuchet' },
    { value: 'Impact', label: 'Impact' },
    { value: 'Arial Black', label: 'Arial Black' },
    { value: 'Arial Narrow', label: 'Arial Narrow' },
    { value: 'Century Gothic', label: 'Century Gothic' },
    { value: 'Gill Sans', label: 'Gill Sans' },
    { value: 'Lucida Console', label: 'Lucida Console' },
    { value: 'Lucida Sans Unicode', label: 'Lucida Sans Unicode' },
    { value: 'Tahoma', label: 'Tahoma' },
    { value: 'Palatino Linotype', label: 'Palatino Linotype' },
    { value: 'Serif', label: 'Serif' },
    { value: 'Sans Serif', label: 'Sans Serif' }
  ];

  const customStyles: StyleType = {
    option: (provided, { data }) => ({
      ...provided,
      fontFamily: (data as Option).value
    }),
    singleValue: (provided, { data }) => ({
      ...provided,
      fontFamily: (data as Option).value
    })
  };

  return (
    <FormSelect
      label="Font Family"
      options={fonts}
      value={value}
      onChange={onChange}
      styles={customStyles}
    />
  );
};

export default FontFamilySelector;

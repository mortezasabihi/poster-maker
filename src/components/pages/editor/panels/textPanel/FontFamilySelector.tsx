import { FC, useId } from 'react';
import Select, { StylesConfig } from 'react-select';
import { useTheme } from '~/src/context/theme-context';

interface IProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const FontFamilySelector: FC<IProps> = ({ value, onChange }) => {
  const id = useId();
  const theme = useTheme();

  const fonts: { value: string; label: string }[] = [
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

  const customStyles: StylesConfig<{ value: string; label: string }> = {
    control: (provided, { isFocused }) => ({
      ...provided,
      borderRadius: theme.borderRadius.md,
      boxShadow: theme.boxShadow.sm,
      paddingTop: 2,
      paddingBottom: 2,
      ...(isFocused
        ? {
            borderColor: theme.borderColor.blue[600],
            ':hover': {
              borderColor: theme.borderColor.blue[600]
            }
          }
        : {
            ':hover': {
              borderColor: theme.borderColor.gray[300]
            }
          })
    }),
    option: (provided, { data }) => ({
      ...provided,
      fontFamily: data.value
    }),
    input: (provided) => ({
      ...provided,
      color: theme.colors.black,
      'input:focus': {
        boxShadow: 'none'
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: theme.colors.gray[500]
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    singleValue: (provided, { data }) => ({
      ...provided,
      fontFamily: data.value
    })
  };

  return (
    <div className="py-3">
      <label htmlFor={id}>Font Family</label>

      <Select
        inputId={id}
        options={fonts}
        styles={customStyles}
        value={fonts.find((font) => font.value === value)}
        onChange={(v) => onChange((v as { value: string; label: string }).value)}
      />
    </div>
  );
};

export default FontFamilySelector;

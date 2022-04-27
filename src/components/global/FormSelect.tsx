import { FC, useId } from 'react';
import Select, { StylesConfig, OptionsOrGroups, GroupBase } from 'react-select';
import { useTheme } from '~/src/context/theme-context';

export type Option = { value: string; label: string };
export type OptionsType = OptionsOrGroups<Option, GroupBase<Option>>;
export type StyleType = StylesConfig<Option | GroupBase<Option>>;

interface IProps {
  value: string | undefined;
  onChange: (value: string) => void;
  options: OptionsType;
  label: string;
  styles?: StyleType;
}

const FormSelect: FC<IProps> = ({ value, onChange, label, options, styles }) => {
  const id = useId();
  const theme = useTheme();

  const customStyles: StyleType = {
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
    ...(styles && {
      ...styles
    })
  };

  return (
    <div className="py-3">
      <label htmlFor={id}>{label}</label>

      <Select
        inputId={id}
        options={options}
        styles={customStyles}
        value={options.find((option) => (option as Option).value === value)}
        onChange={(v) => onChange((v as { value: string; label: string }).value)}
      />
    </div>
  );
};

export default FormSelect;

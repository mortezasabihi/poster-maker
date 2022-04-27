import { FC, useId } from 'react';
import type { FontStyle } from '~/src/types/editor';

interface IProps {
  value: FontStyle[];
  onChange: (value: FontStyle[]) => void;
}

const FontStyleSelector: FC<IProps> = ({ value, onChange }) => {
  const id = useId();

  /**
   * Handle On Click
   * @param type {FontStyle}
   * @returns {void}
   */
  const handleOnClick = (type: FontStyle): void => {
    const newValue = value.includes(type)
      ? value.filter((item) => item !== type)
      : [...value, type];

    onChange(newValue);
  };

  /**
   * Active Class
   * @param type {FontStyle}
   * @returns string
   */
  const activeClass = (type: FontStyle): string => {
    return value && value.includes(type) ? 'bg-gray-100' : '';
  };

  return (
    <div className="flex h-full flex-col py-3">
      <label htmlFor={id}>Font Style</label>

      <div className="flex flex-1 items-stretch justify-between rounded-md shadow-sm" role="group">
        <button
          onClick={() => handleOnClick('bold')}
          title="Bold"
          type="button"
          className={`flex-1 rounded-l-md border border-gray-300 py-2 focus:z-10 ${activeClass(
            'bold'
          )}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-6 w-6"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z" />
            <path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" />
          </svg>
        </button>

        <button
          onClick={() => handleOnClick('italic')}
          title="Italic"
          type="button"
          className={`-mx-[1px] flex-1 border border-gray-300 py-2 focus:z-10 ${activeClass(
            'italic'
          )}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-6 w-6"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="11" y1="5" x2="17" y2="5" />
            <line x1="7" y1="19" x2="13" y2="19" />
            <line x1="14" y1="5" x2="10" y2="19" />
          </svg>
        </button>

        <button
          onClick={() => handleOnClick('underline')}
          title="Underline"
          type="button"
          className={`flex-1 border border-gray-300 py-2 focus:z-10 ${activeClass('underline')}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-6 w-6"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 5v5a5 5 0 0 0 10 0v-5" />
            <path d="M5 19h14" />
          </svg>
        </button>

        <button
          onClick={() => handleOnClick('strikethrough')}
          title="Strikethrough"
          type="button"
          className={`-mx-[1px] flex-1 border border-gray-300 py-2 focus:z-10 ${activeClass(
            'strikethrough'
          )}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-6 w-6"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <path d="M16 6.5a4 2 0 0 0 -4 -1.5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1 -4 -1.5" />
          </svg>
        </button>

        <button
          onClick={() => handleOnClick('overline')}
          title="Overline"
          type="button"
          className={`flex-1 rounded-r-md border border-gray-300 py-2 focus:z-10 ${activeClass(
            'overline'
          )}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-6 w-6"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 9v5a5 5 0 0 0 10 0v-5" />
            <path d="M5 5h14" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FontStyleSelector;

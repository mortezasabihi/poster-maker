import { FC, useId } from 'react';
import type { TextAlign } from '~/src/types/editor';

interface IProps {
  value: TextAlign | undefined;
  onChange: (value: TextAlign) => void;
}

const TextAlignSelector: FC<IProps> = ({ value, onChange }) => {
  const id = useId();

  /**
   * Handle On Click
   * @param type {TextAlign}
   * @returns {void}
   */
  const handleOnClick = (type: TextAlign): void => {
    onChange(type);
  };

  /**
   * Active Class
   * @param type {TextAlign}
   * @returns string
   */
  const activeClass = (type: TextAlign): string => {
    return value === type ? 'bg-gray-100' : '';
  };

  return (
    <div className="flex h-full flex-col py-3">
      <label htmlFor={id}>Text Align</label>

      <div className="flex flex-1 items-stretch justify-between rounded-md shadow-sm" role="group">
        <button
          onClick={() => handleOnClick('left')}
          title="Left"
          type="button"
          className={`flex-1 rounded-l-md border border-gray-300 focus:z-10 ${activeClass('left')}`}
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
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="14" y2="12" />
            <line x1="4" y1="18" x2="18" y2="18" />
          </svg>
        </button>

        <button
          onClick={() => handleOnClick('center')}
          title="Center"
          type="button"
          className={`-mx-[1px] flex-1 border border-gray-300 focus:z-10 ${activeClass('center')}`}
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
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="6" y1="18" x2="18" y2="18" />
          </svg>
        </button>

        <button
          onClick={() => handleOnClick('right')}
          title="Right"
          type="button"
          className={`flex-1 border border-gray-300 focus:z-10 ${activeClass('right')}`}
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
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="10" y1="12" x2="20" y2="12" />
            <line x1="6" y1="18" x2="20" y2="18" />
          </svg>
        </button>

        <button
          onClick={() => handleOnClick('justify')}
          title="Justify"
          type="button"
          className={`-mx-[1px] flex-1 rounded-r-md border border-gray-300 focus:z-10 ${activeClass(
            'justify'
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
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="16" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TextAlignSelector;

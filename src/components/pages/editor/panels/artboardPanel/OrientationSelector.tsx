import type { FC } from 'react';

type Orientation = 'portrait' | 'landscape';

interface IProps {
  value: Orientation | undefined;
  onChange: (value: Orientation) => void;
}

const OrientationSelector: FC<IProps> = ({ value, onChange }) => {
  /**
   * Active Class
   * @param orientation {Orientation}
   * @returns {string}
   */
  const activeClass = (orientation: Orientation): string => {
    return value === orientation ? 'bg-gray-100' : '';
  };

  return (
    <div className="flex h-full flex-col py-3">
      <label>Orientation</label>

      <div className="flex flex-1 items-center" role="group">
        <button
          onClick={() => onChange('portrait')}
          title="Portrait"
          type="button"
          className={`-mr-[1px] h-9 w-9 rounded-l-md border border-gray-300 text-gray-700 focus:z-10 ${activeClass(
            'portrait'
          )}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-4 w-4 stroke-current"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
          </svg>
        </button>
        <button
          onClick={() => onChange('landscape')}
          title="Landscape"
          type="button"
          className={`h-9 w-9 rounded-r-md border border-gray-300 text-gray-700 focus:z-10 ${activeClass(
            'landscape'
          )}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-4 w-4 stroke-current"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M16 5v4a1 1 0 0 0 1 1h4" />
            <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2v-7l-5 -5h-11a2 2 0 0 0 -2 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OrientationSelector;

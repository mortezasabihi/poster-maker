import type { FC } from 'react';

const Toolbar: FC = () => {
  return (
    <nav className="flex w-14 bg-white shadow-xl">
      <ul className="w-full py-5">
        <li>
          <button
            title="Rect"
            className="flex w-full justify-center p-3 text-gray-700 focus:ring-0"
          >
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z" />
            </svg>
          </button>
        </li>
        <li>
          <button
            title="Circle"
            className="flex w-full justify-center p-3 text-gray-700 focus:ring-0"
          >
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z" />
            </svg>
          </button>
        </li>
        <li>
          <button
            title="Triangle"
            className="flex w-full justify-center p-3 text-gray-700 focus:ring-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 fill-current"
              viewBox="0 0 16 16"
            >
              <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Toolbar;

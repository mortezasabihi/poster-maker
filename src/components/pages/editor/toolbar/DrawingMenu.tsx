import type { FC } from 'react';
import useStore from '~/src/store/editorStore';

const DrawingMenu: FC = () => {
  const drawingMode = useStore((state) => state.drawingMode);
  const toggleDrawingMode = useStore((dispatch) => dispatch.toggleDrawingMode);

  return (
    <ul className="w-full">
      <li>
        <button
          onClick={toggleDrawingMode}
          title="Pen"
          className={`flex w-full justify-center p-3 text-gray-700 focus:ring-0 ${
            drawingMode && 'bg-gray-200'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
          </svg>
        </button>
      </li>
    </ul>
  );
};

export default DrawingMenu;

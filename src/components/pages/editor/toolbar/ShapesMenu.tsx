import type { FC } from 'react';
import type { Shape } from '~/src/types/editor';
import { dispatch as busDispacth } from '~/src/hooks/useBus';
import { EDITOR_CANVAS_EVENTS } from '~/src/constants/editor';

const ShapeMenu: FC = () => {
  /**
   * Handle Shape Change
   * @param shape Shape
   * @returns void
   */
  const handleShapeChange = (shape: Shape) => {
    busDispacth({
      type: EDITOR_CANVAS_EVENTS.ADD_SHAPE,
      shape
    });
  };

  return (
    <ul className="w-full">
      <li className="my-2 border-b"></li>
      <li>
        <button
          onClick={() => handleShapeChange('rect')}
          title="Rect"
          className="flex w-full justify-center p-3 text-gray-700 focus:ring-0"
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
            <rect x="4" y="4" width="16" height="16" rx="2" />
          </svg>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleShapeChange('circle')}
          title="Circle"
          className="flex w-full justify-center p-3 text-gray-700 focus:ring-0"
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
            <circle cx="12" cy="12" r="9" />
          </svg>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleShapeChange('triangle')}
          title="Triangle"
          className="flex w-full justify-center p-3 text-gray-700 focus:ring-0"
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
            <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
          </svg>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleShapeChange('hexagon')}
          title="Hexagon"
          className="flex w-full justify-center p-3 text-gray-700 focus:ring-0"
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
            <path d="M19 6.873a2 2 0 0 1 1 1.747v6.536a2 2 0 0 1 -1.029 1.748l-6 3.833a2 2 0 0 1 -1.942 0l-6 -3.833a2 2 0 0 1 -1.029 -1.747v-6.537a2 2 0 0 1 1.029 -1.748l6 -3.572a2.056 2.056 0 0 1 2 0l6 3.573z" />
          </svg>
        </button>
      </li>
      <li>
        <button
          onClick={() => handleShapeChange('octagon')}
          title="Octagon"
          className="flex w-full justify-center p-3 text-gray-700 focus:ring-0"
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
            <path d="M8.7 3h6.6c.3 0 .5 .1 .7 .3l4.7 4.7c.2 .2 .3 .4 .3 .7v6.6c0 .3 -.1 .5 -.3 .7l-4.7 4.7c-.2 .2 -.4 .3 -.7 .3h-6.6c-.3 0 -.5 -.1 -.7 -.3l-4.7 -4.7c-.2 -.2 -.3 -.4 -.3 -.7v-6.6c0 -.3 .1 -.5 .3 -.7l4.7 -4.7c.2 -.2 .4 -.3 .7 -.3z" />
          </svg>
        </button>
      </li>
      <li className="my-2 border-b"></li>
    </ul>
  );
};

export default ShapeMenu;

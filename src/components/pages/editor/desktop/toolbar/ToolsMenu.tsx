import type { FC } from 'react';
import useStore from '~/src/store/editorStore';
import { dispatch } from '~/src/hooks/useBus';
import { Tool, EDITOR_CANVAS_EVENTS } from '~/src/types/editor';

const ToolsMenu: FC = () => {
  const activeTool = useStore((state) => state.activeTool);
  const setActiveTool = useStore((state) => state.setActiveTool);

  /**
   * Handle Tool Click
   * @param tool {Tool}
   * @returns {void}
   */
  const handleToolClick = (tool: Tool): void => {
    if (activeTool === tool) {
      setActiveTool(null);
    } else {
      setActiveTool(tool);
    }
  };

  /**
   * Handle Text Tool Click
   * @returns {void}
   */
  const handleTextToolClick = (): void => {
    dispatch({
      type: EDITOR_CANVAS_EVENTS.ADD_TEXT,
      text: 'Tap & Type'
    });
  };

  return (
    <ul className="w-full">
      <li>
        <button
          onClick={() => handleToolClick('pen')}
          title="Pen"
          className={`flex w-full justify-center p-3 text-gray-700 focus:ring-0 ${
            activeTool === 'pen' && 'bg-gray-200'
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
      <li>
        <button
          onClick={() => handleToolClick('line')}
          title="Line"
          className={`flex w-full justify-center p-3 text-gray-700 focus:ring-0 ${
            activeTool === 'line' && 'bg-gray-200'
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
            <circle cx="6" cy="18" r="2" />
            <circle cx="18" cy="6" r="2" />
            <line x1="7.5" y1="16.5" x2="16.5" y2="7.5" />
          </svg>
        </button>
      </li>
      <li>
        <button
          onClick={handleTextToolClick}
          title="Text"
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
            <line x1="6" y1="4" x2="18" y2="4" />
            <line x1="12" y1="4" x2="12" y2="20" />
          </svg>
        </button>
      </li>
    </ul>
  );
};

export default ToolsMenu;

import type { FC } from 'react';
import type { ActivePanel } from '~/src/types/editor';
import { useTheme } from '~/src/context/theme-context';

interface IProps {
  activePanel: ActivePanel;
  onChange: (panel: ActivePanel) => void;
}

const SidebarMenu: FC<IProps> = ({ activePanel, onChange }) => {
  const { colors } = useTheme();

  /**
   * Handle Click
   * @param panel {ActivePanel}
   * @returns {void}
   */
  const handleClick = (panel: ActivePanel): void => {
    onChange(panel);
  };

  /**
   * Active Color
   * @param panel {ActivePanel}
   * @returns {string}
   */
  const activeColor = (panel: ActivePanel): string => {
    return activePanel === panel ? colors.blue['500'] : colors.gray['600'];
  };

  return (
    <nav className="flex w-10 border-l bg-gray-100">
      <ul className="flex flex-1 flex-col-reverse space-y-4 space-y-reverse py-5">
        <li className="flex justify-center">
          <button onClick={() => handleClick('layer')} type="button" title="Layers">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={activeColor('layer')}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="12 4 4 8 12 12 20 8 12 4" />
              <polyline points="4 12 12 16 20 12" />
              <polyline points="4 16 12 20 20 16" />
            </svg>
          </button>
        </li>
        <li className="flex justify-center">
          <button onClick={() => handleClick('object')} type="button" title="Object">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={activeColor('object')}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 8h8v8h-8z" />
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarMenu;

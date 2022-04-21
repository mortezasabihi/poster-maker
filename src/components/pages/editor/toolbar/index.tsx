import { FC } from 'react';
import ToolsMenu from './ToolsMenu';
import ShapeMenu from './ShapesMenu';
import ColorMenu from './ColorMenu';

const Toolbar: FC = () => {
  return (
    <nav className="flex w-14 flex-col bg-white py-5 shadow-xl">
      <ToolsMenu />
      <ShapeMenu />
      <ColorMenu />
    </nav>
  );
};

export default Toolbar;

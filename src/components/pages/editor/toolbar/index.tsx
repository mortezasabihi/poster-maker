import { FC } from 'react';
import ColorMenu from './ColorMenu';
import DrawingMenu from './DrawingMenu';
import ShapeMenu from './ShapesMenu';

const Toolbar: FC = () => {
  return (
    <nav className="flex w-14 flex-col bg-white py-5 shadow-xl">
      <DrawingMenu />
      <ShapeMenu />
      <ColorMenu />
    </nav>
  );
};

export default Toolbar;

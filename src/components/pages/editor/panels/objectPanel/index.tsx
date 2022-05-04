import { FC, Suspense, lazy } from 'react';
import useStore from '~/src/store/editorStore';

const TextPanel = lazy(() => import('./textPanel'));
const ShapePanel = lazy(() => import('./shapePanel'));

const ObjectPanel: FC = () => {
  const activeObjectType = useStore((state) => state.activeObjectType);

  const components = {
    'i-text': TextPanel,
    rect: ShapePanel,
    circle: ShapePanel,
    triangle: ShapePanel,
    polygon: ShapePanel
  };

  return (
    <div className="flex-1 p-5">
      <Suspense fallback={<div>Loading...</div>}>
        {Object.entries(components).map(([type, Component], index) =>
          activeObjectType === type ? <Component key={index} /> : null
        )}
      </Suspense>
    </div>
  );
};

export default ObjectPanel;

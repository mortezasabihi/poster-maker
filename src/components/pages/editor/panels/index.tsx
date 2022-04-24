import { FC, lazy, Suspense } from 'react';
import useStore from '~/src/store/editorStore';

const TextPanel = lazy(() => import('./TextPanel'));

const Panels: FC = () => {
  const activeObjectType = useStore((state) => state.activeObjectType);

  return (
    <aside className="w-full p-5 shadow-xl md:w-4/12 2xl:w-3/12">
      <Suspense fallback={<div>Loading...</div>}>
        {activeObjectType === 'i-text' && <TextPanel />}
      </Suspense>
    </aside>
  );
};

export default Panels;

import { FC, lazy, Suspense } from 'react';
import { Loading } from '~/src/components/pages/editor';
import useMediaQuery from '~/src/hooks/useMediaQuery';

const Desktop = lazy(() => import('~/src/components/pages/editor/desktop'));
const Mobile = lazy(() => import('~/src/components/pages/editor/mobile'));

const EditorPage: FC = () => {
  const { isDesktop } = useMediaQuery();

  return (
    <div className="flex h-screen">
      <Suspense fallback={<Loading />}>{isDesktop ? <Desktop /> : <Mobile />}</Suspense>
    </div>
  );
};

export default EditorPage;

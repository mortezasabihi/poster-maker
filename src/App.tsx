import type { FC } from 'react';
import { RecoilRoot } from 'recoil';
import Router from '~/src/Router';

const App: FC = () => {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
};

export default App;

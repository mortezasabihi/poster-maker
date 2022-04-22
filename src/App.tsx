import type { FC } from 'react';
import { ThemeProvider } from '~/src/context/theme-context';
import Router from '~/src/Router';

const App: FC = () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};

export default App;

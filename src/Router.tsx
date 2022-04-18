import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '~/src/pages';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

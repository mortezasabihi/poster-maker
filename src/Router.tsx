import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, EditorPage } from '~/src/pages';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="editor" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import type { FC } from 'react';
import { Toolbar, Panels, DocumentWindow } from '~/src/components/pages/editor';

const EditorPage: FC = () => {
  return (
    <div className="flex min-h-screen">
      <Toolbar />

      <div className="flex-1 lg:flex">
        <DocumentWindow />
        <Panels />
      </div>
    </div>
  );
};

export default EditorPage;

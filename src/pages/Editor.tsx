import type { FC } from 'react';
import { Toolbar, Panels, DocumentWindow } from '~/src/components/pages/editor';
import { EditorContextProvider } from '~/src/context/EditorContext';

const EditorPage: FC = () => {
  return (
    <EditorContextProvider>
      <div className="flex min-h-screen">
        <Toolbar />

        <div className="flex-1 lg:flex">
          <DocumentWindow />
          <Panels />
        </div>
      </div>
    </EditorContextProvider>
  );
};

export default EditorPage;

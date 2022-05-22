import type { FC } from 'react';
import Toolbar from './toolbar';
import DocumentWindow from './DocumentWindow';
import Panels from './panels';

const DesktopEditor: FC = () => {
  return (
    <>
      <Toolbar />

      <div className="flex-1 lg:flex">
        <DocumentWindow />
        <Panels />
      </div>
    </>
  );
};

export default DesktopEditor;

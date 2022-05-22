import type { FC } from 'react';
import ImageCover from './ImageCover';

const MobileEditor: FC = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-blue-400">
      <ImageCover />
      <h1 className="mt-8 text-center text-2xl text-white">
        Sorry, <strong>Not supported</strong> in smaller devices.
      </h1>
    </div>
  );
};

export default MobileEditor;

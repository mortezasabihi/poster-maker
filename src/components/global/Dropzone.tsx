import React, { FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileWithPreview } from '~/src/types/editor';

interface IProps {
  onDrop?: (files: FileWithPreview | undefined) => void;
  file?: File;
}

const Dropzone: FC<IProps> = ({ onDrop, file: defaultFile }) => {
  const [file, setFile] = useState<FileWithPreview | undefined>(
    defaultFile && {
      ...defaultFile,
      preview: URL.createObjectURL(defaultFile)
    }
  );
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    multiple: false,
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg']
    },
    onDrop: (files) => {
      if (onDrop) {
        onDrop(files[0] as unknown as FileWithPreview);
      }
      setFile(Object.assign(files[0], { preview: URL.createObjectURL(files[0]) }));
    }
  });

  /**
   * Delete the file
   * @param e {React.MouseEvent}
   * @returns {void}
   */
  const deleteFile = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setFile(undefined);
    acceptedFiles.splice(0, 1);
    if (onDrop) onDrop(acceptedFiles[0] as FileWithPreview);
  };

  const Content = (
    <div className="flex flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-20 w-20 fill-current text-gray-300 transition-all duration-100 group-hover:-translate-y-1 group-hover:text-blue-300"
      >
        <path d="M 12 4 C 9.6655084 4 7.7006133 5.2494956 6.4296875 7.0136719 C 2.8854572 7.05389 0 9.9465993 0 13.5 C 0 17.078268 2.9217323 20 6.5 20 L 18.5 20 C 21.525577 20 24 17.525577 24 14.5 C 24 11.509638 21.577034 9.0762027 18.599609 9.0195312 C 17.729938 6.1415745 15.152096 4 12 4 z M 12 6 C 14.504527 6 16.55398 7.825491 16.931641 10.214844 L 17.083984 11.175781 L 18.048828 11.050781 C 18.272182 11.021699 18.414903 11 18.5 11 C 20.444423 11 22 12.555577 22 14.5 C 22 16.444423 20.444423 18 18.5 18 L 13 18 L 13 14 L 16 14 L 12 10 L 8 14 L 11 14 L 11 18 L 6.5 18 C 4.0022677 18 2 15.997732 2 13.5 C 2 11.002268 4.0022677 9 6.5 9 C 6.534993 9 6.6164592 9.0069899 6.75 9.0136719 L 7.3613281 9.0449219 L 7.6660156 8.5136719 C 8.5301088 7.0123517 10.137881 6 12 6 z" />
      </svg>
      <p className="mb-1 text-xl font-bold text-gray-700 transition-all duration-100 group-hover:scale-105 group-hover:text-blue-500">
        Select a Image file to upload
      </p>
      <p className="text-sm text-gray-500">or drag and drop it here</p>
    </div>
  );

  const Preview = (
    <div className="relative">
      {file && (
        <>
          <img src={file.preview} alt="preview" className="h-full w-full rounded-lg object-cover" />
          <button
            onClick={deleteFile}
            className="absolute top-0 right-0 m-4 h-8 w-8 rounded-full border border-gray-300 bg-white p-2 text-gray-500 hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 fill-current"
              viewBox="0 0 32 32"
            >
              <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z" />
            </svg>
          </button>
        </>
      )}
    </div>
  );

  return (
    <section className="group w-full">
      <div
        {...getRootProps({
          className:
            'border-dashed w-full min-h-[16rem] border-2 rounded p-8 flex items-center justify-center cursor-pointer group-hover:border-blue-200 transition-all duration-100'
        })}
      >
        <input {...getInputProps()} />
        {file ? Preview : Content}
      </div>
    </section>
  );
};

export default Dropzone;

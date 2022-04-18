import { FC, useRef, useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { fabric } from 'fabric';
import { configSelector } from '~/src/store/editor';

const DocumentWindow: FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = useRef<fabric.Canvas | null>(null);
  const config = useRecoilValue(configSelector);

  const handleCanvasInit = useCallback(
    (canvasInstance: fabric.Canvas) => {
      if (!wrapperRef.current) return;

      const { backgroundColor, size } = config;

      canvasInstance.setWidth(size?.width || wrapperRef.current?.clientWidth);
      canvasInstance.setHeight(size?.height || wrapperRef.current?.clientHeight);
      canvasInstance.setBackgroundColor(
        backgroundColor,
        canvasInstance.renderAll.bind(canvasInstance)
      );

      canvasInstance.renderAll();
    },
    [config]
  );

  useEffect(() => {
    if (canvasRef.current) {
      const fCanvas = new fabric.Canvas(canvasRef.current);

      fCanvas.on('object:added', () => {
        fCanvas.renderAll();
      });

      canvas.current = fCanvas;

      handleCanvasInit(fCanvas);
    }

    return () => {
      canvas.current?.dispose();
    };
  }, [handleCanvasInit]);

  return (
    <main className="flex w-full items-center justify-center bg-gray-200 lg:w-9/12">
      <div ref={wrapperRef} className="h-96 w-6/12 shadow-2xl">
        <canvas ref={canvasRef} />
      </div>
    </main>
  );
};

export default DocumentWindow;

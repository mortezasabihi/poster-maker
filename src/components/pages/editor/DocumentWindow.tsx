import { FC, useRef, useEffect, useCallback } from 'react';
import { fabric } from 'fabric';
import type { Shape } from '~/src/types/editor';
import useBus from '~/src/hooks/useBus';
import { EDITOR_CANVAS_EVENTS } from '~/src/constants/editor';

const DocumentWindow: FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = useRef<fabric.Canvas | null>(null);

  /**
   * Handle Canvas Init
   * @param canvas Canvas
   * @returns void
   */
  const handleCanvasInit = useCallback((canvasInstance: fabric.Canvas) => {
    if (!wrapperRef.current) return;

    canvasInstance.setWidth(wrapperRef.current.clientWidth);
    canvasInstance.setHeight(wrapperRef.current.clientHeight);
    canvasInstance.setBackgroundColor('#fff', canvasInstance.renderAll.bind(canvasInstance));

    canvasInstance.renderAll();
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const fCanvas = new fabric.Canvas(canvasRef.current);

      fCanvas.on('object:added', () => {
        fCanvas.renderAll();

        // set last object active
        const lastObject = fCanvas.item(fCanvas.getObjects().length - 1);
        fCanvas.setActiveObject(lastObject as unknown as fabric.Object);
      });

      canvas.current = fCanvas;

      handleCanvasInit(fCanvas);
    }

    return () => {
      canvas.current?.dispose();
    };
  }, [handleCanvasInit]);

  /**
   * Handle Add Shape
   * @param shape Shape
   * @returns void
   */
  const handleAddShape = (shape: Shape) => {
    if (canvas.current) {
      if (shape === 'rect') {
        canvas.current.add(
          new fabric.Rect({
            width: 100,
            height: 100,
            fill: '#000',
            top: 100,
            left: 100
          })
        );
      } else if (shape === 'circle') {
        canvas.current.add(
          new fabric.Circle({
            radius: 50,
            fill: '#e60d0d',
            top: 100,
            left: 100
          })
        );
      } else if (shape === 'triangle') {
        canvas.current.add(
          new fabric.Triangle({
            width: 100,
            height: 100,
            fill: '#13d35a',
            top: 100,
            left: 100
          })
        );
      } else if (shape === 'hexagon') {
        const s = new fabric.Polygon(
          [
            { x: 850, y: 75 },
            { x: 958, y: 137.5 },
            { x: 958, y: 262.5 },
            { x: 850, y: 325 },
            { x: 742, y: 262.5 },
            { x: 742, y: 137.5 }
          ],
          {
            fill: '#4b0de6',
            top: 100,
            left: 100,
            width: 100,
            height: 100
          }
        );
        canvas.current.add(s);
      } else if (shape === 'octagon') {
        const size = 100;
        const side = Math.round((size * Math.sqrt(2)) / (2 + Math.sqrt(2)));

        canvas.current.add(
          new fabric.Polygon(
            [
              { x: -side / 2, y: size / 2 },
              { x: side / 2, y: size / 2 },
              { x: size / 2, y: side / 2 },
              { x: size / 2, y: -side / 2 },
              { x: side / 2, y: -size / 2 },
              { x: -side / 2, y: -size / 2 },
              { x: -size / 2, y: -side / 2 },
              { x: -size / 2, y: side / 2 }
            ],
            {
              fill: '#e1ff00',
              top: 100,
              left: 100
            }
          )
        );
      }
    }
  };

  useBus<{ shape: Shape }>(EDITOR_CANVAS_EVENTS.ADD_SHAPE, ({ shape }) => handleAddShape(shape));

  return (
    <main className="flex w-full items-center justify-center bg-gray-200 lg:w-9/12">
      <div ref={wrapperRef} className="h-96 w-6/12 shadow-2xl">
        <canvas ref={canvasRef} />
      </div>
    </main>
  );
};

export default DocumentWindow;

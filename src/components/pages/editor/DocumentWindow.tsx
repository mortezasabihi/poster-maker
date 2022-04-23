import { FC, useRef, useEffect, useCallback } from 'react';
import { fabric } from 'fabric';
import type { Shape } from '~/src/types/editor';
import useBus from '~/src/hooks/useBus';
import { EDITOR_CANVAS_EVENTS } from '~/src/types/editor';
import useStore from '~/src/store/editorStore';
import useEsc from '~/src/hooks/useEsc';

const DocumentWindow: FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = useRef<fabric.Canvas | null>(null);

  const activeTool = useStore((state) => state.activeTool);
  const setActiveTool = useStore((state) => state.setActiveTool);
  const color = useStore((state) => state.color);

  /**
   * Handle ESC key
   * @returns {void}
   */
  const handleEscKey = useCallback(() => {
    if (canvas.current) {
      setActiveTool(null);
      canvas.current.discardActiveObject();
      canvas.current.renderAll();
    }
  }, [setActiveTool]);

  useEsc(() => handleEscKey());

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

  const mouseDown = useRef<boolean>(false);
  const line = useRef<fabric.Line | null>(null);

  /**
   * Handle Start Adding Line
   * @param e {fabric.IEvent}
   * @returns {void}
   */
  const handleStartAddingLine = useCallback(
    (e: fabric.IEvent) => {
      if (!canvas.current) return;
      mouseDown.current = true;

      const pointer = canvas.current.getPointer(e.e);

      line.current = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        stroke: color,
        strokeWidth: 2
      });

      canvas.current.add(line.current);
    },
    [color]
  );
  /**
   * Handle Start Drawing Line
   * @param e {fabric.IEvent}
   * @returns {void}
   */
  const handleStartDrawingLine = useCallback(
    (e: fabric.IEvent) => {
      if (!canvas.current || !mouseDown.current || !line.current) return;

      const pointer = canvas.current.getPointer(e.e);

      line.current.set({ x2: pointer.x, y2: pointer.y });
      canvas.current.renderAll();
    },
    [mouseDown]
  );
  /**
   * Handle Stop Drawing Line
   * @returns {void}
   */
  const handleStopDrawingLine = (): void => {
    mouseDown.current = false;
  };

  /**
   * Handle Active Tool Change
   * @returns void
   */
  const handleActiveToolChange = useCallback(() => {
    if (!canvas.current) return;

    // free drawing mode
    if (activeTool === 'pen') {
      canvas.current.isDrawingMode = activeTool === 'pen';
      canvas.current.freeDrawingBrush.color = color;
    } else {
      canvas.current.isDrawingMode = false;
    }

    // line drawing mode
    if (activeTool === 'line') {
      canvas.current.on('mouse:down', handleStartAddingLine);
      canvas.current.on('mouse:move', handleStartDrawingLine);
      canvas.current.on('mouse:up', handleStopDrawingLine);
    } else {
      canvas.current.off('mouse:down', handleStartAddingLine);
      canvas.current.off('mouse:move', handleStartDrawingLine);
      canvas.current.off('mouse:up', handleStopDrawingLine);
    }
  }, [activeTool, color, handleStartAddingLine, handleStartDrawingLine]);

  useEffect(() => {
    handleActiveToolChange();
  }, [activeTool, handleActiveToolChange]);

  /**
   * Handle Change Active Object Color
   * @returns void
   */
  const handleChangeActiveObjectColor = useCallback(() => {
    if (!canvas.current) return;

    const activeObjects = canvas.current.getActiveObjects();

    if (activeObjects.length) {
      activeObjects.forEach((activeObject) => {
        const { type } = activeObject;

        if (type === 'path') {
          activeObject.set('stroke', color);
        } else if (type === 'line') {
          activeObject.set('stroke', color);
        } else {
          activeObject.set('fill', color);
        }
      });

      canvas.current.renderAll();
    }
  }, [color]);

  useEffect(() => {
    handleChangeActiveObjectColor();
  }, [handleChangeActiveObjectColor]);

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
            fill: color,
            top: 100,
            left: 100
          })
        );
      } else if (shape === 'circle') {
        canvas.current.add(
          new fabric.Circle({
            radius: 50,
            fill: color,
            top: 100,
            left: 100
          })
        );
      } else if (shape === 'triangle') {
        canvas.current.add(
          new fabric.Triangle({
            width: 100,
            height: 100,
            fill: color,
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
            fill: color,
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
              fill: color,
              top: 100,
              left: 100
            }
          )
        );
      }
    }
  };

  useBus<{ shape: Shape }>(EDITOR_CANVAS_EVENTS.ADD_SHAPE, ({ shape }) => handleAddShape(shape));

  /**
   * Handle Add Text
   * @param text {string}
   * @returns {void}
   */
  const handleAddText = (text: string): void => {
    if (canvas.current) {
      canvas.current.add(
        new fabric.IText(text, {
          fontFamily: 'Arial',
          left: 100,
          top: 100,
          fontSize: 20,
          fill: color
        })
      );
    }
  };

  useBus<{ text: string }>(EDITOR_CANVAS_EVENTS.ADD_TEXT, ({ text }) => handleAddText(text));

  return (
    <main className="flex w-full items-center justify-center bg-gray-200 lg:w-9/12">
      <div ref={wrapperRef} className="h-96 w-6/12 shadow-2xl">
        <canvas ref={canvasRef} />
      </div>
    </main>
  );
};

export default DocumentWindow;

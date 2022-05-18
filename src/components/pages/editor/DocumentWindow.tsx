import { FC, useRef, useEffect, useCallback } from 'react';
import { fabric } from 'fabric';
import Draggable from 'react-draggable';
import { generateRandomId } from '~/src/lib/utils';
import {
  Shape,
  ShapePayload,
  EDITOR_CANVAS_EVENTS,
  TextPayload,
  ObjectPayload,
  CanvasPayload,
  ObjectOrderPayload,
  LinePayload
} from '~/src/types/editor';
import useBus, { dispatch } from '~/src/hooks/useBus';
import useStore from '~/src/store/editorStore';
import useKeyDown from '~/src/hooks/useKeyDown';
import useKeyPress from '~/src/hooks/useKeyPress';

const DocumentWindow: FC = () => {
  const mainRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = useRef<fabric.Canvas | null>(null);

  const setCanvas = useStore((state) => state.setCanvas);
  const activeTool = useStore((state) => state.activeTool);
  const setActiveTool = useStore((state) => state.setActiveTool);
  const color = useStore((state) => state.color);
  const setActiveObject = useStore((state) => state.setActiveObject);
  const addLayer = useStore((state) => state.addLayer);
  const updateLayer = useStore((state) => state.updateLayer);
  const removeLayer = useStore((state) => state.removeLayer);

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

  useKeyDown('Escape', () => handleEscKey());

  /**
   * Handle Delete key
   * @returns {void}
   */
  const handleDeleteKey = useCallback(() => {
    if (!canvas.current) return;

    const activeObject = canvas.current.getActiveObject();

    const isLocked =
      activeObject.get('lockMovementX') &&
      activeObject.get('lockMovementY') &&
      activeObject.get('lockScalingX') &&
      activeObject.get('lockScalingY') &&
      activeObject.get('lockRotation');

    if (isLocked) return;

    removeLayer(activeObject?.name as string);

    canvas.current.remove(activeObject);
    canvas.current.renderAll();
  }, [removeLayer]);

  useKeyDown('Delete', () => handleDeleteKey());

  /**
   * Handle Canvas Init
   * @param canvas Canvas
   * @returns {void}
   */
  const handleCanvasInit = useCallback(
    (canvasInstance: fabric.Canvas) => {
      canvasInstance.setWidth(900);
      canvasInstance.setHeight(600);
      canvasInstance.setBackgroundColor(
        'rgba(255,255,255)',
        canvasInstance.renderAll.bind(canvasInstance)
      );

      canvasInstance.renderAll();

      setCanvas(canvasInstance);
    },
    [setCanvas]
  );

  /**
   * Handle Object Selection
   * @params e {any}
   * @returns {void}
   */
  const handleObjectSelection = useCallback(
    (e: any) => {
      if (e.selected.length === 1) {
        setActiveObject(e.selected[0]);
      }
    },
    [setActiveObject]
  );

  /**
   * Handle Object Added
   * @returns {void}
   */
  const handleObjectAdded = useCallback(() => {
    if (!canvas.current) return;

    canvas.current.renderAll();

    // set last object active
    const lastObject = canvas.current.item(canvas.current.getObjects().length - 1);
    canvas.current.setActiveObject(lastObject as unknown as fabric.Object);

    addLayer(lastObject as unknown as fabric.Object);
  }, [addLayer]);

  /**
   * Handle Object Modified
   * @param e {fabric.IEvent}
   * @returns {void}
   */
  const handleObjectModified = useCallback(({ target }: fabric.IEvent) => {
    dispatch({
      type: EDITOR_CANVAS_EVENTS.MODIFY_OBJECT,
      payload: target
    });
  }, []);

  /**
   * Handle Object Scaling
   * @param e {fabric.IEvent}
   * @returns {void}
   */
  const handleObjectScaling = useCallback(({ target }: fabric.IEvent) => {
    const obj = target as fabric.Object;

    obj.set({
      scaleX: Number(obj.scaleX?.toFixed(4)),
      scaleY: Number(obj.scaleY?.toFixed(4))
    });
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const fCanvas = new fabric.Canvas(canvasRef.current);

      fCanvas.on('object:added', handleObjectAdded);
      fCanvas.on('object:modified', handleObjectModified);
      fCanvas.on('object:scaling', handleObjectScaling);

      // on object selected
      fCanvas.on('selection:created', handleObjectSelection);
      fCanvas.on('selection:updated', handleObjectSelection);

      // on object deselected
      fCanvas.on('selection:cleared', () => {
        setActiveObject(null);
      });

      canvas.current = fCanvas;

      handleCanvasInit(fCanvas);
    }

    return () => {
      canvas.current?.dispose();
    };
  }, [
    handleCanvasInit,
    handleObjectAdded,
    handleObjectModified,
    handleObjectScaling,
    handleObjectSelection,
    setActiveObject
  ]);

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
        strokeWidth: 2,
        name: `line-${generateRandomId()}`
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

      dispatch({
        type: EDITOR_CANVAS_EVENTS.HANDLE_LINE_DRAWED,
        payload: line.current
      });
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
      canvas.current.freeDrawingBrush.width = 2;
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
      activeObjects.forEach((object) => {
        const { type } = object;

        if (type === 'path') {
          object.set('stroke', color);
        } else if (type === 'line') {
          object.set('stroke', color);
        } else {
          object.set('fill', color);
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
      // deselect all objects
      canvas.current.discardActiveObject();

      if (shape === 'rect') {
        canvas.current.add(
          new fabric.Rect({
            width: 100,
            height: 100,
            fill: color,
            top: 100,
            left: 100,
            name: `rect-${generateRandomId()}`,
            originX: 'center',
            originY: 'center'
          })
        );
      } else if (shape === 'circle') {
        canvas.current.add(
          new fabric.Circle({
            radius: 50,
            fill: color,
            top: 100,
            left: 100,
            name: `circle-${generateRandomId()}`,
            originX: 'center',
            originY: 'center'
          })
        );
      } else if (shape === 'triangle') {
        canvas.current.add(
          new fabric.Triangle({
            width: 100,
            height: 100,
            fill: color,
            top: 100,
            left: 100,
            name: `triangle-${generateRandomId()}`,
            originX: 'center',
            originY: 'center'
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
            height: 100,
            name: `hexagon-${generateRandomId()}`,
            originX: 'center',
            originY: 'center'
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
              left: 100,
              name: `octagon-${generateRandomId()}`,
              originX: 'center',
              originY: 'center'
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
          fill: color,
          name: `text-${generateRandomId()}`
        })
      );
    }
  };

  useBus<{ text: string }>(EDITOR_CANVAS_EVENTS.ADD_TEXT, ({ text }) => handleAddText(text));

  /**
   * Handle Update Object
   * @param payload {ObjectPayload}
   * @returns {void}
   */
  const handleUpdateObject = (payload: ObjectPayload): void => {
    if (!canvas.current) return;

    const type = canvas.current.getActiveObject()?.type;

    if (type === 'i-text') {
      const activeObject = canvas.current.getActiveObject() as fabric.IText;
      const { fontFamily, fontSize, fontStyle, textAlign } = payload as TextPayload;

      if (activeObject) {
        activeObject.set({
          fontFamily,
          fontSize,
          textAlign,
          ...(fontStyle.includes('bold') ? { fontWeight: 'bold' } : { fontWeight: 'normal' }),
          ...(fontStyle.includes('italic') ? { fontStyle: 'italic' } : { fontStyle: 'normal' }),
          ...(fontStyle.includes('underline') ? { underline: true } : { underline: false }),
          ...(fontStyle.includes('strikethrough') ? { linethrough: true } : { linethrough: false }),
          ...(fontStyle.includes('overline') ? { overline: true } : { overline: false })
        });
      }
    } else if (type === 'rect' || type === 'circle' || type === 'triangle' || type === 'polygon') {
      const activeObject = canvas.current.getActiveObject();
      const { size, rotation, stroke } = payload as ShapePayload;

      if (activeObject) {
        activeObject.set({
          angle: rotation,
          strokeWidth: stroke.width,
          stroke: stroke.color,
          width: (size.width as number) / (activeObject.scaleX as number),
          height: (size.height as number) / (activeObject.scaleY as number)
        });
      }
    } else if (type === 'line') {
      const { stroke, size, rotation } = payload as LinePayload;
      const activeObject = canvas.current.getActiveObject() as fabric.Line;

      activeObject.set({
        strokeWidth: stroke.width,
        stroke: stroke.color,
        width: size.width,
        height: size.height,
        scaleX: 1,
        scaleY: 1,
        angle: rotation
      });
    }

    canvas.current.renderAll();
  };

  useBus<{ payload: ObjectPayload }>(EDITOR_CANVAS_EVENTS.UPDATE_OBJECT, ({ payload }) =>
    handleUpdateObject(payload)
  );

  /**
   * Handle Select Object
   * @param name {string}
   * @returns {void}
   */
  const handleSelectObject = (name: string): void => {
    if (!canvas.current) return;

    const objects = canvas.current.getObjects();

    if (objects.length) {
      objects.forEach((object) => {
        if (object.name === name) {
          canvas.current?.setActiveObject(object);
        }
      });
    }

    canvas.current.renderAll();
  };

  useBus<{ name: string }>(EDITOR_CANVAS_EVENTS.SELECT_OBJECT, ({ name }) =>
    handleSelectObject(name)
  );

  /**
   * Handle Lock Object
   * @param name {string}
   * @returns {void}
   */
  const handleLockObject = (name: string): void => {
    if (!canvas.current) return;

    const objects = canvas.current.getObjects();

    if (objects.length) {
      objects.forEach((object) => {
        if (object.name === name) {
          object.set({
            lockMovementX: !object.lockMovementX,
            lockMovementY: !object.lockMovementY,
            lockScalingX: !object.lockScalingX,
            lockScalingY: !object.lockScalingY,
            lockRotation: !object.lockRotation
          });

          updateLayer(object.name as string, object);
        }
      });
    }

    canvas.current.renderAll();
  };

  useBus<{ name: string }>(EDITOR_CANVAS_EVENTS.LOCK_OBJECT, ({ name }) => handleLockObject(name));

  /**
   * Handle Hide Object
   * @param name {string}
   * @returns {void}
   */
  const handleHideObject = (name: string): void => {
    if (!canvas.current) return;

    const objects = canvas.current.getObjects();

    if (objects.length) {
      objects.forEach((object) => {
        if (object.name === name) {
          object.set({
            visible: !object.visible
          });

          updateLayer(object.name as string, object);
        }
      });
    }

    canvas.current.renderAll();
  };

  useBus<{ name: string }>(EDITOR_CANVAS_EVENTS.HIDE_OBJECT, ({ name }) => handleHideObject(name));

  /**
   * Handle Canvas Update
   * @param payload {CanvasPayload}
   * @returns {void}
   */
  const handleCanvasUpdate = (payload: CanvasPayload): void => {
    if (!canvas.current) return;

    const { backgroundColor, size } = payload;

    canvas.current.setBackgroundColor(
      backgroundColor,
      canvas.current.renderAll.bind(canvas.current)
    );

    canvas.current.setWidth(size.width);
    canvas.current.setHeight(size.height);

    canvas.current.renderAll();
  };

  useBus<{ payload: CanvasPayload }>(EDITOR_CANVAS_EVENTS.UPDATE_CANVAS, ({ payload }) =>
    handleCanvasUpdate(payload)
  );

  /**
   * Handle Object Order
   * @param payload {ObjectOrderPayload}
   * @returns {void}
   */
  const handleObjectOrder = ({
    dragName,
    hoverName,
    dragIndex,
    hoverIndex
  }: ObjectOrderPayload): void => {
    if (!canvas.current) return;

    const direction = dragIndex < hoverIndex ? 1 : -1;
    const dragObject = canvas.current.getObjects().find((object) => object.name === dragName);
    const hoverObject = canvas.current.getObjects().find((object) => object.name === hoverName);

    if (dragObject && hoverObject) {
      if (hoverIndex === 0) {
        canvas.current.sendToBack(dragObject);
      } else if (hoverIndex === canvas.current.getObjects().length - 1) {
        canvas.current.bringToFront(dragObject);
      }

      if (hoverIndex !== canvas.current.getObjects().length - 1 && hoverIndex !== 0) {
        if (direction === 1) {
          canvas.current.bringForward(dragObject);
        } else {
          canvas.current.sendBackwards(dragObject);
        }
      }
    }
  };

  useBus<{ payload: ObjectOrderPayload }>(EDITOR_CANVAS_EVENTS.UPDATE_OBJECT_ORDER, ({ payload }) =>
    handleObjectOrder(payload)
  );

  const space = useKeyPress(' ');

  /**
   * Handle Space Key Press
   * @returns {void}
   */
  const handleSpaceKeyPress = useCallback(() => {
    if (!canvas.current) return;

    const activeObjectType = canvas.current.getActiveObject()?.type;

    if (activeObjectType === 'i-text') return;

    if (space) {
      canvas.current.discardActiveObject();
      canvas.current.selection = false;
    } else {
      canvas.current.selection = true;
    }

    canvas.current.renderAll();
  }, [space]);

  useEffect(() => {
    handleSpaceKeyPress();
  }, [handleSpaceKeyPress]);

  return (
    <main
      ref={mainRef}
      className="relative flex w-full items-center justify-center overflow-scroll bg-gray-200 md:w-8/12 2xl:w-9/12"
    >
      <Draggable disabled={!space} bounds="parent">
        <div className={`absolute shadow-2xl ${space ? 'cursor-pointer' : ''}`}>
          {/* overlay */}
          <div className={`absolute inset-0 z-50 ${space ? 'block' : 'hidden'}`} />
          <canvas ref={canvasRef} />
        </div>
      </Draggable>
    </main>
  );
};

export default DocumentWindow;

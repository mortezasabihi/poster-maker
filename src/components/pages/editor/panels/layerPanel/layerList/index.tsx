import { FC, useCallback } from 'react';
import useStore from '~/src/store/editorStore';
import Layer from './Layer';
import { dispatch } from '~/src/hooks/useBus';
import { EDITOR_CANVAS_EVENTS } from '~/src/types/editor';

interface IProps {
  filter: string;
}

const LayerList: FC<IProps> = ({ filter }) => {
  const layers = useStore((state) => state.layers);
  const activeObject = useStore((state) => state.activeObject);
  const updateLayers = useStore((state) => state.updateLayers);

  const filteredLayers = layers.filter((layer) => {
    const { type } = layer;

    if (filter === 'text') {
      return type === 'i-text' || type === 'text';
    }

    if (filter === 'shapes') {
      return (
        type === 'rect' ||
        type === 'circle' ||
        type === 'triangle' ||
        type === 'polygon' ||
        type === 'line' ||
        type === 'path'
      );
    }

    return true;
  });

  /**
   * Handle Select
   * @param layer {fabric.Object}
   * @returns {void}
   */
  const handleSelect = (layer: fabric.Object): void => {
    dispatch({
      type: EDITOR_CANVAS_EVENTS.SELECT_OBJECT,
      name: layer.name
    });
  };

  /**
   * Handle Lock
   * @param layer {fabric.Object}
   * @returns {void}
   */
  const handleLock = (layer: fabric.Object): void => {
    dispatch({
      type: EDITOR_CANVAS_EVENTS.LOCK_OBJECT,
      name: layer.name
    });
  };

  /**
   * Handle Lock
   * @param layer {fabric.Object}
   * @returns {void}
   */
  const handleHide = (layer: fabric.Object): void => {
    dispatch({
      type: EDITOR_CANVAS_EVENTS.HIDE_OBJECT,
      name: layer.name
    });
  };

  /**
   * Handle OnDragStart
   * @param e {React.DragEvent}
   * @param index {number}
   * @returns {void}
   */
  const handleOnDragStart = useCallback((e: React.DragEvent, name: string, index: number): void => {
    e.dataTransfer.setData('dragName', name);
    e.dataTransfer.setData('dragIndex', String(index));
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  /**
   * Handle onDrop
   * @param e {React.DragEvent}
   * @param index {number}
   * @returns {void}
   */
  const handleOnDrop = useCallback(
    (e: React.DragEvent, name: string, index: number): void => {
      const dragName = e.dataTransfer.getData('dragName');
      const hoverName = name;
      const dragIndex = Number(e.dataTransfer.getData('dragIndex'));
      const hoverIndex = index;

      if (dragName === hoverName) return;

      updateLayers(dragName, hoverName);

      dispatch({
        type: EDITOR_CANVAS_EVENTS.UPDATE_OBJECT_ORDER,
        payload: {
          dragName,
          hoverName,
          dragIndex,
          hoverIndex
        }
      });
    },
    [updateLayers]
  );

  /**
   * handle onDragOver
   * @param e {React.DragEvent<HTMLUListElement>}
   * @returns {void}
   */
  const handleOnDragOver = (e: React.DragEvent<HTMLUListElement>): void => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <ul className="h-full" onDragOver={handleOnDragOver}>
        {filteredLayers.map((layer, index) => (
          <Layer
            key={index}
            layer={layer}
            onSelect={handleSelect}
            selected={activeObject}
            onLock={handleLock}
            onHide={handleHide}
            onDragStart={(e) => handleOnDragStart(e, layer?.name as string, index)}
            onDrop={(e) => handleOnDrop(e, layer?.name as string, index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default LayerList;

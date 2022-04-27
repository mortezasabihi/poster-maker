import type { FC } from 'react';
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

  return (
    <div className="flex-1 overflow-y-auto">
      <ul>
        {filteredLayers.map((layer, index) => (
          <Layer
            layer={layer}
            key={index}
            onSelect={handleSelect}
            selected={activeObject}
            onLock={handleLock}
            onHide={handleHide}
          />
        ))}
      </ul>
    </div>
  );
};

export default LayerList;

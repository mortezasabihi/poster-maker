import { FC } from 'react';

type IconTypes = 'rect' | 'triangle' | 'polygon' | 'circle' | 'i-text' | 'line' | 'path';

interface IProps {
  layer: fabric.Object;
  onSelect: (layer: fabric.Object) => void;
  selected: fabric.Object;
  onHide: (layer: fabric.Object) => void;
  onLock: (layer: fabric.Object) => void;
  onDragStart: (e: React.DragEvent<HTMLElement>) => void;
  onDrop: (e: React.DragEvent<HTMLElement>) => void;
}

const TypeIcon: FC<{
  type: IconTypes;
}> = ({ type }) => {
  const icons = {
    rect: (
      <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <rect x="4" y="4" width="16" height="16" rx="2" />
      </>
    ),
    circle: (
      <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
    triangle: (
      <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
      </>
    ),
    polygon: (
      <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19 6.873a2 2 0 0 1 1 1.747v6.536a2 2 0 0 1 -1.029 1.748l-6 3.833a2 2 0 0 1 -1.942 0l-6 -3.833a2 2 0 0 1 -1.029 -1.747v-6.537a2 2 0 0 1 1.029 -1.748l6 -3.572a2.056 2.056 0 0 1 2 0l6 3.573z" />
      </>
    ),
    'i-text': (
      <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="6" y1="4" x2="18" y2="4" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </>
    ),
    line: (
      <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <line x1="7.5" y1="16.5" x2="16.5" y2="7.5" />
      </>
    ),
    path: (
      <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
      </>
    )
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      className="stroke-current text-gray-400"
      height="12"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[type]}
    </svg>
  );
};

const Layer: FC<IProps> = ({ layer, onSelect, selected, onHide, onLock, onDragStart, onDrop }) => {
  const isHide = layer.visible === false;
  const isLock =
    (layer.lockMovementX &&
      layer.lockMovementY &&
      layer.lockScalingX &&
      layer.lockScalingY &&
      layer.lockRotation) ||
    false;
  const selectedLayer = selected?.name === layer.name;

  return (
    <li
      onDragStart={onDragStart}
      onDrop={onDrop}
      draggable
      onClick={() => onSelect(layer)}
      className={`px-2, group flex cursor-pointer select-none items-center justify-between rounded py-1.5 px-2
       ${selectedLayer ? 'bg-blue-100' : 'bg-white'}
      `}
    >
      <span className="flex items-center">
        <TypeIcon type={layer.type as IconTypes} />
        <span className="ml-3 text-xs uppercase text-gray-500">{layer.name}</span>
      </span>

      <span className="flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLock(layer);
          }}
          type="button"
          className={`mr-1.5 opacity-0 group-hover:opacity-100 ${isLock && 'opacity-100'}`}
          title={isLock ? 'Unlock' : 'Lock'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`stroke-current ${isLock ? 'text-gray-500' : 'text-gray-400'}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <circle cx="12" cy="16" r="1" />
            <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onHide(layer);
          }}
          type="button"
          className={`opacity-0 group-hover:opacity-100 ${isHide && 'opacity-100'}`}
          title={isHide ? 'Show' : 'Hide'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`stroke-current ${isHide ? 'text-gray-500' : 'text-gray-400'}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="2" />
            <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
          </svg>
        </button>
      </span>
    </li>
  );
};

export default Layer;

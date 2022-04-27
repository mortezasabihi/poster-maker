import { FC, useState } from 'react';
import type { ActivePanel } from '~/src/types/editor';
import SidebarMenu from './SidebarMenu';
import ObjectPanel from './objectPanel';
import LayerPanel from './layerPanel';

const Panels: FC = () => {
  const [activePanel, setActivePanel] = useState<ActivePanel>('object');

  const components: { [key in ActivePanel]: FC } = {
    object: ObjectPanel,
    layer: LayerPanel
  };

  return (
    <aside className="flex w-full flex-row-reverse items-stretch shadow-xl md:w-4/12 2xl:w-3/12 ">
      <SidebarMenu activePanel={activePanel} onChange={setActivePanel} />

      {Object.entries(components).map(([type, Component], index) =>
        activePanel === type ? <Component key={index} /> : null
      )}
    </aside>
  );
};

export default Panels;

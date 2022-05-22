import { FC, useState } from 'react';
import LayerFilter from './LayerFilter';
import LayerList from './LayerList';

const LayerPanel: FC = () => {
  const [filter, setFilter] = useState<string>('all');

  return (
    <div className="flex flex-1 flex-col p-5">
      <LayerFilter value={filter} onChange={setFilter} />

      <LayerList filter={filter} />
    </div>
  );
};

export default LayerPanel;

import type { FC } from 'react';

const Panels: FC = () => {
  return (
    <aside className="w-full p-5 shadow-xl lg:w-3/12">
      <div className="py-3">
        <h3 className="text-xs uppercase tracking-wider text-gray-500">Size</h3>

        <select className="mt-4 block w-full">
          <option value="30*40">30 x 40 cm</option>
          <option value="50*70">50 x 70 cm</option>
          <option value="70*100">70 x 100 cm</option>
        </select>
      </div>
    </aside>
  );
};

export default Panels;

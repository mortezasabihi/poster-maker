import { type FC, useId, useState, useEffect } from 'react';
import { Modal, Dropzone } from '~/src/components/global';
import useStore from '~/src/store/editorStore';
import { FileWithPreview } from '~/src/types/editor';

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

type Tabs = 'computer' | 'unsplash';

const Content: FC<{ active: Tabs; onDrop: (img: string) => void }> = ({ active, onDrop }) => {
  const backgroundImage = useStore((state) => state.backgroundImage);
  const setBackgroundImage = useStore((state) => state.setBackgroundImage);

  /**
   * Handle on drop
   * @param f {File | undefined}
   * @returns {void}
   */
  const handleOnDrop = (f: FileWithPreview | undefined): void => {
    if (f) {
      setBackgroundImage(f);

      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = () => {
        const img = reader.result as string;
        onDrop(img);
      };
    } else {
      setBackgroundImage(null);
      onDrop('');
    }
  };

  return (
    <main className="w-8/12">
      {active === 'computer' && <Dropzone file={backgroundImage as File} onDrop={handleOnDrop} />}
    </main>
  );
};

const Sidebar: FC<{ active: Tabs; setActive: (tab: Tabs) => void }> = ({ active, setActive }) => {
  /**
   * Active Class
   * @param tab {Tabs}
   * @returns {string}
   */
  const activeClass = (tab: Tabs): string => (tab === active ? 'font-bold' : '');

  return (
    <aside className="w-4/12">
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => setActive('computer')}
            className={`flex items-center text-sm ${activeClass('computer')}`}
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 24 24"
              enableBackground="new 0 0 24 24"
              xmlSpace="preserve"
              className="mr-3 h-5 w-5"
            >
              <g id="Frames-24px">
                {' '}
                <rect fill="none" width="24" height="24" />
              </g>
              <g id="Outline">
                {' '}
                <path
                  fill="#757575"
                  d="M22,3H2C0.897,3,0,3.897,0,5v13c0,1.103,0.897,2,2,2h9v2H7v2h10v-2h-4v-2h9c1.103,0,2-0.897,2-2V5		C24,3.897,23.103,3,22,3z M22,5l-0.002,10H2V5H22z M2,18v-1h19.997v1H2z"
                />
              </g>
            </svg>

            <span>My Computer</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => setActive('unsplash')}
            className={`flex items-center text-sm ${activeClass('unsplash')}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5" viewBox="0 0 448 512">
              <path d="M448,230.17V480H0V230.17H141.13V355.09H306.87V230.17ZM306.87,32H141.13V156.91H306.87Z" />
            </svg>

            <span>Unsplash</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

const BackgroundImageSelector: FC<IProps> = ({ onChange }) => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tabs>('computer');
  const [image, setImage] = useState<string>('');

  /**
   * Handle Select
   * @returns {void}
   */
  const handleSelect = (): void => {
    onChange(image);
    setOpen(false);
  };

  return (
    <>
      <div className="py-3">
        <label htmlFor={id}>Background Image</label>

        <div className="flex items-center">
          <button
            id={id}
            type="button"
            className="flex-1 rounded-lg border px-4 py-2 text-sm text-gray-700 shadow-sm"
            onClick={() => setOpen(true)}
          >
            Upload/Select Image
          </button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} size="lg" heading="Background Image">
        <div className="mt-3 flex">
          <Sidebar active={activeTab} setActive={setActiveTab} />
          <Content active={activeTab} onDrop={setImage} />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            className="font-semi-bold rounded bg-blue-500 py-2 px-4 text-sm text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!image}
            onClick={handleSelect}
          >
            Select
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BackgroundImageSelector;

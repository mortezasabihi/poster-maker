import type { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="m-auto block scale-50 bg-transparent"
        width="204px"
        height="204px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          className="stroke-current text-purple-600"
          strokeWidth="3"
          r="46"
          strokeDasharray="216.76989309769573 74.25663103256524"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.9615384615384615s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};

export default Loading;

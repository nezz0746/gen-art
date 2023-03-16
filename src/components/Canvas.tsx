import React, { ReactNode } from 'react';
import { useWindowSize } from 'react-use';

export default function Canvas({ children }: { children: ReactNode }): JSX.Element {
  const { height } = useWindowSize();

  return (
    <div className="h-screen w-screen flex flex-row justify-center items-center">
      <div
        style={{ width: height, height: height - 40 }}
        className="bg-white overflow-scroll shadow-2xl rounded-lg border-2 border-black"
      >
        {children}
      </div>
    </div>
  );
}

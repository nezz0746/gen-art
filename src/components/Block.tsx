import dayjs from 'dayjs';
import React from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export interface BlockProps {
  number: number;
  createdDate: Date;
}

const Block = ({ number, blockHeight, createdDate }: BlockProps & { blockHeight: number }) => {
  const blockVerticalMargin = 5;
  return (
    <div
      style={{
        paddingTop: blockVerticalMargin,
        paddingBottom: blockVerticalMargin,
        height: blockHeight,
      }}
      className="bg-white overflow-hidden shadow-xl w-40 justify-center items-center flex rounded-lg border"
    >
      <div className="border text-center">
        <a href={`https://etherscan.io/block/${number}`}>
          <p className="text-wh font-bold">#{number}</p>
        </a>
        <p className="text-xs font-bold">{dayjs(createdDate).fromNow()}</p>
      </div>
    </div>
  );
};

export default Block;

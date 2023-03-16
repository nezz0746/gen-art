import classNames from 'classnames';
import React from 'react';
import Canvas from '../components/Canvas';
import NFT from '../images/NFT.jpg';

const NFTPage = (): JSX.Element => {
  return (
    <Canvas>
      <div className="flex flex-col h-full justify-center items-center">
        <button
          type="button"
          className={classNames({
            'w-80 h-80 object-cover': true,
          })}
        >
          <img src={NFT} alt="NFT" className="border-2 rounded-lg border-gray-400" />
        </button>
      </div>
    </Canvas>
  );
};

export default NFTPage;

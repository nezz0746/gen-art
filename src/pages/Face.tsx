/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/outline';
import chroma from 'chroma-js';
import { animated, config, Controller, to, useTransition } from 'react-spring';
import { useBlockMeta, useBlockNumber, useEthers } from '@usedapp/core';
import { useInterval } from 'react-use';
import Canvas from '../components/Canvas';
import Block, { BlockProps } from '../components/Block';

const getNewBlock = (nbr: number) => ({
  colors: 'black',
  number: nbr,
});

const getInitialBlocks = () => {
  const blocks = [];
  for (let i = 0; i < 7; i++) {
    blocks.push(getNewBlock(i));
  }
  return blocks;
};

const Face = (): JSX.Element => {
  const { library } = useEthers();
  const ethBlockNumber = useBlockNumber();
  const blockMeta = useBlockMeta();
  const [paused, setPaused] = useState(false);
  const [blocks, setBlocks] = useState<BlockProps[]>([]);
  const [blockNumber, setBlockNumber] = useState(7);

  const updateBlocks = useCallback(
    async (oldBlocks: BlockProps[]) => {
      const a = await library.getBlockNumber();
      console.log(`a`, a);
      // if (oldBlocks.length > 7) {
      if (oldBlocks.length === 0) {
        setBlocks([{ number: a, createdDate: new Date() }]);
      } else {
        const lastBlockNumber = oldBlocks[0].number;
        const blockToAdd: BlockProps[] = Array.from(
          Array(a - lastBlockNumber).fill({}),
          (block, index) => ({
            number: lastBlockNumber + (index + 1),
            createdDate: new Date(),
          }),
        );
        setBlocks([...blockToAdd.reverse(), ...oldBlocks].slice(0, 7));
      }
      // } else {
      //   // const newBlocks = [{ colors: 'black', number: ethBlockNumber }, ...oldBlocks];
      //   // setBlocks(newBlocks);
      // }
    },
    [ethBlockNumber],
  );
  const blockHeight = 80;
  useInterval(() => {
    if (library) {
      updateBlocks(blocks);
    }
  }, 2000);

  // useEffect(() => {
  //   if (library) {
  //     updateBlocks(blocks);
  //   }
  // }, [ethBlockNumber]);

  const blockToProcessTransaction = 12;

  const transitions = useTransition(blocks, {
    keys: (block: BlockProps) => block.number,
    initial: { height: 0 },
    from: (block: BlockProps, index) => ({
      opacity: 0,
      height: 0,
    }),
    enter: (block: BlockProps, index) => ({ opacity: 1, height: blockHeight + 10, zIndex: 1 }),
    update: (block: BlockProps, index) => {
      return { height: blockHeight + 10, zIndex: 2 };
    },
    leave: { opacity: 0 },
    // onRest: () => {
    //   const newBlockNumber = blockNumber + 1;
    //   const newBlocks = [getNewBlock(newBlockNumber), ...blocks.slice(0, -1)];

    //   setBlocks(newBlocks);
    //   setBlockNumber(newBlockNumber);
    // },
    onChange: (e, f: Controller) => {
      // if (blocks[3].number === blockToProcessTransaction) {
      //   f.pause();
      // }
    },
    config: { ...config.stiff, duration: 300 },
    // reset: true,
  });

  useEffect(() => {
    // const initialBlocks = getInitialBlocks().reverse();
    // setBlocks(initialBlocks);
    // setBlockNumber(initialBlocks.length - 1);
  }, []);
  console.log(`blocks.length`, blocks.length);

  return (
    <Canvas>
      <div className="relative items-end flex flex-col h-full p-5 bg-gray-200">
        <div className="shadow-lg p-2 border rounded-lg overflow-hidden bg-white">
          {transitions((props, block) => {
            return (
              <animated.div key={block.number} style={props}>
                <Block {...block} blockHeight={blockHeight} />
              </animated.div>
            );
          })}
        </div>
      </div>
    </Canvas>
  );
};

export default Face;

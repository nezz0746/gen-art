/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import { easeExpInOut } from 'd3-ease';
import React from 'react';
import { animated, useSpring } from 'react-spring';
import { useWindowSize } from 'react-use';
import Canvas from '../components/Canvas';
import earth from '../images/earth.png';
import planetA from '../images/planetA.png';
import planetC from '../images/planetC.png';

type OrbitProps = {
  orbitSize: number;
  planetSize: number;
  revolution: number;
  planetPosition: number;
};

const planetImages: Record<number, string> = {
  1: planetC,
  2: earth,
  3: planetA,
};

const Orbit = ({ planetSize, orbitSize, revolution, planetPosition }: OrbitProps) => {
  // Rotation Spring
  const { rotate } = useSpring({
    from: { rotate: 0 },
    rotate: 360,
    loop: true,
    config: {
      easing: (t) => t,
      duration: revolution * 2,
    },
  });

  // Deorbiting Spring
  const { orbitX, orbitY } = useSpring({
    from: { orbitX: orbitSize, orbitY: orbitSize },
    config: {
      easing: easeExpInOut,
      duration: revolution * (3 + (4 - planetPosition)),
    },
  });

  const spinFaster = async () => {
    const xStart = orbitX.get();
    const yStart = orbitY.get();

    await Promise.all([
      orbitX.start({
        to: async (next) => {
          await next(xStart + 250);
          await next(xStart);
        },
      }),
      orbitY.start({
        to: async (next) => {
          await next(yStart + 250);
          await next(yStart);
        },
      }),
    ]);
  };

  return (
    <animated.div
      style={{
        height: orbitY,
        width: orbitX,
        zIndex: 10 - planetPosition,
        rotate,
      }}
      onClick={() => {
        spinFaster();
      }}
      className={classNames(
        'absolute cursor-pointer flex flex-col justify-center items-end bg-opacity-30 rounded-full',
      )}
    >
      <div
        style={{
          height: planetSize,
          width: planetSize,
        }}
        className={classNames('bg-white rounded-full shadow-2xl')}
      >
        <img src={planetImages[planetPosition]} className="h-full w-full" alt="planet" />
      </div>
    </animated.div>
  );
};

const BlackHole = () => {
  return <div className="border-2 border-black rounded-full" />;
};

export default function SolarSystem(): JSX.Element {
  const { height } = useWindowSize();

  const windowSize = height - 40;

  const planets: OrbitProps[] = [
    {
      planetSize: windowSize / 10 / 5,
      orbitSize: windowSize / 10,
      revolution: 365,
      planetPosition: 1,
    },
    {
      planetSize: windowSize / 3 / 5,
      orbitSize: windowSize / 3,
      revolution: 365 * 3,
      planetPosition: 2,
    },
    {
      planetSize: windowSize / 5,
      orbitSize: windowSize,
      revolution: 365 * 20,
      planetPosition: 3,
    },
  ];

  return (
    <Canvas>
      <div className="flex flex-col h-full justify-center center-of-the-universe items-center">
        <div className="flex flex-row justify-center items-center">
          {planets.map((planet, _index) => {
            return <Orbit key={_index} {...planet} />;
          })}
          <BlackHole />
        </div>
      </div>
    </Canvas>
  );
}

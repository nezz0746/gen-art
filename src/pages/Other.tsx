/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useMemo } from 'react';
import { useMeasure, useMouse } from 'react-use';
import chroma from 'chroma-js';
import { useSpring, animated } from 'react-spring';
import Canvas from '../components/Canvas';

function radiansToDegrees(radians) {
  const pi = Math.PI;
  return radians * (180 / pi);
}

const Line = ({
  coordinates,
  measures: { width, height },
  numberOfLines,
  index,
  lineColor,
}: {
  coordinates: number[];
  measures: { width: number; height: number };
  numberOfLines: number;
  index: number;
  lineColor: any;
}) => {
  const lineCenterCoordinates = [width / 2, (height / numberOfLines / 2) * (1 + index * 2)];

  const angleToRotate = Math.atan(
    (coordinates[1] - lineCenterCoordinates[1]) / (coordinates[0] - lineCenterCoordinates[0]),
  );
  const { transform } = useSpring({
    to: { transform: `perspective(600px) rotate(${radiansToDegrees(angleToRotate)}deg)` },
    config: {
      friction: 4,
    },
  });

  return (
    <animated.div
      className="shadow-2xl"
      key={Math.random()}
      style={{
        width,
        height: height / numberOfLines,
        backgroundColor: lineColor.darken(index / 5),
        transform,
      }}
    />
  );
};

const Other = (): JSX.Element => {
  const [ref, { width, height }] = useMeasure();
  const mouseRef = React.useRef(null);
  const { elX, elY } = useMouse(mouseRef);

  const coordinates = [elX, elY];

  const numberOfLines = 10;

  const grid = Array(numberOfLines).fill({});

  const lineColor = useMemo(() => chroma.random(), []);

  return (
    <Canvas>
      <div className="h-full w-full" ref={mouseRef}>
        <div className="h-full w-full" ref={ref}>
          {grid.map((_a, index) => {
            return (
              <Line
                key={index}
                coordinates={coordinates}
                measures={{ width, height }}
                numberOfLines={numberOfLines}
                lineColor={lineColor}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </Canvas>
  );
};

export default Other;

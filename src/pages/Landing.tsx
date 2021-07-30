/* eslint-disable react/jsx-key */
import { useWindowSize, useHover } from 'react-use';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import chroma from 'chroma-js';

type GridSquareState = {
  color: string;
  size: number;
};

const buildGrid = (length: number, squareSize: number): GridSquareState[][] => {
  const grid = [];
  const gridTone = chroma.random();

  for (let colIndex = 0; colIndex < length; colIndex += 1) {
    const rows = [];
    for (let rowIndex = 0; rowIndex < length; rowIndex += 1) {
      rows.push({
        color: gridTone.darken((colIndex + rowIndex) / 12),
        size: squareSize,
      });
    }
    grid.push(rows);
  }

  return grid;
};

const useGrid = () => {
  const { width, height } = useWindowSize();
  const gridSize = 40;

  const squareSize = height / gridSize;

  const grid = useMemo(() => buildGrid(gridSize, squareSize), [squareSize]);

  return { grid, width, height };
};

type Coordinates = { x: number; y: number };

const useBlip = () => {
  const [styles, api] = useSpring(() => ({ opacity: 1, config: { duration: 100 } }));

  const interact = useCallback(
    (wave: number) => {
      api.start({
        to: async (next) => {
          await next({ opacity: 0.3 });
          await next({ opacity: 1 });
        },
        delay: wave * 50,
      });
    },
    [api],
  );

  return { styles, interact };
};

const Square = ({
  color,
  size,
  clickedCoordinates,
  setCoordinates,
  coordinates,
}: GridSquareState & {
  clickedCoordinates: Coordinates | null;
  coordinates: Coordinates;
  setCoordinates: () => void;
}) => {
  const { styles, interact } = useBlip();
  const renderSquare = (hovered) => (
    <animated.div
      className={classNames({
        'cursor-pointer': true,
      })}
      style={{
        backgroundColor: !hovered ? chroma(color) : chroma(color).brighten(0.2),
        height: size,
        width: size,
        ...styles,
      }}
      onClick={() => {
        setCoordinates();
      }}
    />
  );
  const [hoverableSquare] = useHover(renderSquare);

  const launch = useCallback(() => {
    if (clickedCoordinates !== null) {
      const dx = Math.abs(coordinates.x - clickedCoordinates.x);
      const dy = Math.abs(coordinates.y - clickedCoordinates.y);
      if (dx > dy) {
        interact(dx);
      } else {
        interact(dy);
      }
    }
  }, [clickedCoordinates, coordinates.x, coordinates.y, interact]);

  useEffect(() => {
    launch();
  }, [clickedCoordinates, launch]);

  return <>{hoverableSquare}</>;
};

export default function LandingPage(): JSX.Element {
  const { grid, width, height } = useGrid();
  const [clickedCoordinates, setClickedCoordinates] = useState<null | Coordinates>(null);

  return (
    <div className="flex flex-row justify-center" style={{ height, width }}>
      {grid.map((col, colIndex) => {
        return (
          <div>
            {col.map((square, rowIndex) => (
              <Square
                {...square}
                clickedCoordinates={clickedCoordinates}
                coordinates={{
                  x: colIndex,
                  y: rowIndex,
                }}
                setCoordinates={() => {
                  setClickedCoordinates({
                    x: colIndex,
                    y: rowIndex,
                  });
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

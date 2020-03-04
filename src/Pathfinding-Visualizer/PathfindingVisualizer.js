import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

function PathfindingVisualizer() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, []);

  //handle all mouse events

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };
  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };
  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  //algorithm

  const visualizeDijkstra = () => {};

  //rendered array
  const gridData = grid.map((row, rowIdx) => {
    return (
      <div key={rowIdx}>
        {row.map((node, nodeIdx) => {
          const { row, col, isFinish, isStart, isWall } = node;
          return (
            <Node
              key={nodeIdx}
              col={col}
              isFinish={isFinish}
              isStart={isStart}
              isWall={isWall}
              mouseIsPressed={mouseIsPressed}
              onMouseDown={(row, col) => handleMouseDown(row, col)}
              onMouseEnter={(row, col) => handleMouseEnter(row, col)}
              onMouseUp={() => handleMouseUp()}
              row={row}
            ></Node>
          );
        })}
      </div>
    );
  });

  return (
    <div>
      <button onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className="grid">{gridData}</div>
      <Node />
    </div>
  );
}

const getInitialGrid = () => {
  const tempGrid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(row, col));
    }
    tempGrid.push(currentRow);
  }
  return tempGrid;
};

const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  console.log(row + " " + col);
  console.log(newGrid);
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default PathfindingVisualizer;

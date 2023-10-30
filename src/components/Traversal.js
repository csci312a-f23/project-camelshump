/*
 * Traversal.js
 *
 * params: currentMap: 2D array of chars to be rendered as a grid
 *          key: key which was pressed that triggered this function call
 *          position: the position which the user is currently at
 *
 */

import PropTypes from "prop-types";

// based on the direction, update the user position indicated by x, y
export function keyMovements(direction, x, y, currentMap) {
  // eslint-disable-next-line no-console
  console.log("In keyMovements");
  switch (direction) {
    case "ArrowUp":
      return x - 1 >= 0 ? [x - 1, y] : [x, y];
    case "ArrowDown":
      return x + 1 < currentMap.length ? [x + 1, y] : [x, y];
    case "ArrowLeft":
      return y - 1 >= 0 ? [x, y - 1] : [x, y];
    case "ArrowRight":
      return y + 1 < currentMap[0].length ? [x, y + 1] : [x, y];
    default:
      return [x, y]; // Return the same position if no valid direction
  }
}

// know which button/key was clicked and decide which direction to movie in based on that
function getDirection(key) {
  switch (key) {
    case "ArrowUp":
    case "w":
      // eslint-disable-next-line no-console
      console.log("Arrow Up");
      return "ArrowUp";
    case "ArrowDown":
    case "s":
      // eslint-disable-next-line no-console
      console.log("Arrow Down");
      return "ArrowDown";
    case "ArrowLeft":
    case "a":
      // eslint-disable-next-line no-console
      console.log("Arrow Left");
      return "ArrowLeft";
    case "ArrowRight":
    case "d":
      // eslint-disable-next-line no-console
      console.log("Arrow Right");
      return "ArrowRight";
    default:
      return null;
  }
}

export function Traversal(currentMap, key, position) {
  const direction = getDirection(key);
  const [x, y] = keyMovements(direction, position[0], position[1], currentMap);

  return [x, y];
}

Traversal.propTypes = {
  currentMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.char)).isRequired,
  position: PropTypes.arrayOf(PropTypes.Number).isRequired,
};

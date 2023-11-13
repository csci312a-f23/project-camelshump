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
export default function keyMovements(key, currentPos, currentMap) {
  const sectionsPerRow = Math.sqrt(currentMap.length);
  const sectionLength = currentMap[0].length - 1;
  switch (key) {
    case "ArrowLeft":
      // Check that character isn't on top edge of current section
      if (currentPos[1] - 1 >= 0) {
        return [currentPos[0], currentPos[1] - 1, currentPos[2]];
      }
      // Check character is not in top row of sections
      if (currentPos[2] >= sectionsPerRow) {
        // Move to above row of sections
        return [currentPos[0], sectionLength, currentPos[2] - sectionsPerRow];
      }
      // Stop character from leaving map
      return currentPos;

    case "ArrowRight":
      // Check that character isn't on bottom edge of current section
      if (currentPos[1] < sectionLength) {
        return [currentPos[0], currentPos[1] + 1, currentPos[2]];
      }
      // Check that character is not in bottom row of sections
      if (currentMap.length - 1 - currentPos[2] >= sectionsPerRow) {
        // Move to below row of sections
        return [currentPos[0], 0, currentPos[2] + sectionsPerRow];
      }
      // Stop character from leaving map
      return currentPos;

    case "ArrowUp":
      // Check that character isn't on left edge of current section
      if (currentPos[0] - 1 >= 0) {
        return [currentPos[0] - 1, currentPos[1], currentPos[2]];
      }
      // Check that character is not in leftmost column of sections
      if (currentPos[2] % sectionsPerRow !== 0) {
        // Move to next row of sections on the left
        return [sectionLength, currentPos[1], currentPos[2] - 1];
      }
      // Stop character from leaving map
      return currentPos;

    case "ArrowDown":
      // Check that character isn't on right edge of current section
      if (currentPos[0] < sectionLength) {
        return [currentPos[0] + 1, currentPos[1], currentPos[2]];
      }
      // Check that character is not in rightmost column of sections
      if (currentPos[2] % sectionsPerRow !== sectionsPerRow - 1) {
        return [0, currentPos[1], currentPos[2] + 1];
      }
      // Stop character from leaving map
      return currentPos;

    default:
      return currentPos; // Return the same position if no valid direction
  }
}

export function Traversal(currentMap, key, currentPos) {
  const nextPos = keyMovements(key, currentPos, currentMap);

  return nextPos;
}

Traversal.propTypes = {
  key: PropTypes.string,
  currentMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

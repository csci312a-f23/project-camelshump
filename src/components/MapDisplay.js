/*
 * MapDisplay.js
 *
 * params: currentMap: 2D array of chars to be rendered as a grid
 *
 * currently assumes that it receives 2D array, not json
 */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "../styles/MapDisplay.module.css";

export default function MapDisplay({ currentMap, position }) {
  const [displayMap, setDisplayMap] = useState([]);

  // useEffect changes position of X character based on the received position from key presses
  useEffect(() => {
    setDisplayMap(
      currentMap[position[2]].map((row, rowIndex) => (
        // call Traversal.js pass (rowIndex,colIndex)
        // eslint-disable-next-line react/no-array-index-key
        <div className={styles.row} key={rowIndex}>
          {row.map((char, colIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={styles.cell} data-testid="map" key={colIndex}>
              {colIndex === position[0] && rowIndex === position[1] ? (
                <ul>X</ul>
              ) : (
                <ul>{char}</ul>
              )}
            </div>
          ))}
        </div>
      )),
    );
  }, [position, currentMap]);

  return <div className={styles.mapDisplay}>{displayMap}</div>;
}

MapDisplay.propTypes = {
  currentMap: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  ).isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

/*
 * MapDisplay.js
 *
 * params: currentMap: 2D array of chars to be rendered as a grid
 *
 * currently assumes that it receives 2D array, not json
 */
import PropTypes from "prop-types";
import styles from "../styles/MapDisplay.module.css";

export default function MapDisplay({ currentMap }) {
  const mapGrid = currentMap.map((row, rowIndex) => (
    // eslint-disable-next-line react/no-array-index-key
    <div className={styles.row} key={rowIndex}>
      {row.map((char, colIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className={styles.cell} key={colIndex}>
          <ul>{char}</ul>
        </div>
      ))}
    </div>
  ));

  return <div className={styles.mapDisplay}>{mapGrid}</div>;
}

MapDisplay.propTypes = {
  currentMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.char)).isRequired,
};

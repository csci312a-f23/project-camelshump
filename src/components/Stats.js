// Stats.js

import PropTypes from "prop-types";
import StatBar from "./Statbar";
import styles from "../styles/Stats.module.css";

export default function Stats({
  health,
  strength,
  defense,
  intelligence,
  speed,
  rizz,
  maxHealth,
  art,
}) {
  return (
    <div>
      <div className={styles.stats}>
        <StatBar label="Health" value={health} maxValue={maxHealth} />
        <StatBar label="Strength" value={strength} />
        <StatBar label="Defense" value={defense} />
        <StatBar label="Speed" value={speed} />
        <StatBar label="Defense" value={intelligence} />
        <StatBar label="Defense" value={rizz} />
      </div>
      <div className={styles.art}>
        <pre>{art}</pre>
      </div>
    </div>
  );
}

Stats.propTypes = {
  health: PropTypes.number.isRequired,
  strength: PropTypes.number.isRequired,
  defense: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  intelligence: PropTypes.number.isRequired,
  rizz: PropTypes.number.isRequired,
  maxHealth: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  art: PropTypes.string.isRequired,
};

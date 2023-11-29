// Stats.js

import PropTypes from "prop-types";
import StatBar from "./Statbar";
import styles from "../styles/Stats.module.css";

export default function Stats({
  health,
  strength,
  maxHealth,
  maxStrength,
  art,
}) {
  return (
    <div>
      <div>
        <StatBar label="Health" value={health} maxValue={maxHealth} />
        <StatBar label="Strength" value={strength} maxValue={maxStrength} />
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
  maxHealth: PropTypes.number.isRequired,
  maxStrength: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  art: PropTypes.string,
};

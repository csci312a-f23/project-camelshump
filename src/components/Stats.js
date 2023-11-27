// Stats.js

import PropTypes from "prop-types";
import StatBar from "./Statbar";

export default function Stats({ health, strength, maxHealth, maxStrength }) {
  return (
    <div>
      <StatBar label="Health" value={health} maxValue={maxHealth} />
      <StatBar label="Strength" value={strength} maxValue={maxStrength} />
    </div>
  );
}

Stats.propTypes = {
  health: PropTypes.number.isRequired,
  strength: PropTypes.number.isRequired,
  maxHealth: PropTypes.number.isRequired,
  maxStrength: PropTypes.number.isRequired,
};

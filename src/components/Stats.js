// Stats.js

import PropTypes from "prop-types";
import StatBar from "./Statbar";
import styles from "../styles/Stats.module.css";
import StatsShape from "./StatsShape";

export default function Stats({ stats, isEnemy }) {
  return (
    <div>
      <div className={styles.stats}>
        <StatBar
          label="Health"
          value={stats.health}
          maxValue={stats.maxHealth}
        />
        <StatBar label="Strength" value={stats.strength} />
        <StatBar label="Defense" value={stats.defense} />
        {!isEnemy && <StatBar label="Stamina" value={stats.stamina} />}
        <StatBar label="Speed" value={stats.speed} />
        <StatBar label="Intelligence" value={stats.intelligence} />
        <StatBar label="Rizz" value={stats.rizz} />
        {/* conditionally render level if provided */}
        {!isEnemy && <p>Level: {stats.level}</p>}
      </div>
    </div>
  );
}

Stats.propTypes = {
  stats: StatsShape.isRequired,
  isEnemy: PropTypes.bool.isRequired,
};

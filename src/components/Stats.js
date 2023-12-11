// Stats.js

import PropTypes from "prop-types";
import StatBar from "./Statbar";
import styles from "../styles/Stats.module.css";
import StatsShape from "./StatsShape";

export default function Stats({ stats, stamina, score }) {
  return (
    <div>
      {score > 0 && (
        <div className={styles.score}>
          <p>Score: {score}</p>
        </div>
      )}
      <div className={styles.stats}>
        <StatBar
          label="Health"
          value={stats.health}
          maxValue={stats.maxHealth}
        />
        <StatBar label="Strength" value={stats.strength} />
        <StatBar label="Defense" value={stats.defense} />
        <StatBar label="Speed" value={stats.speed} />
        <StatBar label="Intelligence" value={stats.intelligence} />
        <StatBar label="Rizz" value={stats.rizz} />
        {/* conditionally render stamina if provided */}
        {stamina && <StatBar label="Stamina" value={stamina} />}
        <p>Level: {stats.level}</p>
        <p>XP: {stats.xp} </p>
      </div>
      <div className={styles.art}>
        <pre>{stats.art}</pre>
      </div>
    </div>
  );
}

Stats.propTypes = {
  stats: StatsShape.isRequired,
  // eslint-disable-next-line react/require-default-props
  stamina: PropTypes.number,
  score: PropTypes.number,
};

Stats.defaultProps = {
  score: 0,
};

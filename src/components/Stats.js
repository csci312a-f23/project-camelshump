// Stats.js

import StatBar from "./Statbar";
import styles from "../styles/Stats.module.css";
import StatsShape from "./StatsShape";

export default function Stats({ stats }) {
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
        <StatBar label="Speed" value={stats.speed} />
        <StatBar label="Intelligence" value={stats.intelligence} />
        <StatBar label="Rizz" value={stats.rizz} />
      </div>
      <div className={styles.art}>
        <pre>{stats.art}</pre>
      </div>
    </div>
  );
}

Stats.propTypes = {
  stats: StatsShape.isRequired,
};

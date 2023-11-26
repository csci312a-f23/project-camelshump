import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/StatBar.module.css";

export default function StatBar({ label, value, maxValue }) {
  const percentage = (value / maxValue) * 100;

  return (
    <div className={styles.statBarContainer}>
      <p>{label}</p>
      <div className={styles.statBar}>
        <div className={styles.barFill} style={{ width: `${percentage}%` }} />
        <span className={styles.percentageText}>{percentage.toFixed(0)}%</span>
      </div>
    </div>
  );
}

StatBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
};

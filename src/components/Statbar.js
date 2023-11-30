import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/StatBar.module.css";

export default function StatBar({ label, value, maxValue }) {
  let percentage;
  if (label === "Health") {
    percentage = (value / maxValue) * 100;
  } else {
    percentage = (value / 10) * 100;
  }

  return (
    <div className={styles.statBarContainer}>
      <p>{label}</p>
      <div className={styles.statBar}>
        <div className={styles.barFill} style={{ width: `${percentage}%` }} />
        {label === "Health" ? (
          <span className={styles.percentageText}>
            {value}/{maxValue}
          </span>
        ) : (
          <span className={styles.percentageText}>{value}</span>
        )}
      </div>
    </div>
  );
}

StatBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
};

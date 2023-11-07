import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/FightEnemy.module.css";

export default function FightEnemy({ closePopup }) {
  const handleClose = () => {
    closePopup(); // Call the close function passed from the play.js
  };

  return (
    <div>
      <div />
      <div className={styles.popup}>
        <button
          type="button"
          className={styles["close-button"]}
          onClick={handleClose}
        >
          &times;
        </button>
        <h2>Enemy Encounter</h2>
        <button type="button"> Fight </button>
        <button type="button"> Run </button>
        <button type="button"> Close </button>
      </div>
    </div>
  );
}

FightEnemy.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

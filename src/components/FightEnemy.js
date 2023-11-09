import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/FightEnemy.module.css";

import FightBox from "./FightBox";

export default function FightEnemy({ closePopup }) {
  const [fightOptions, setFightOptions] = useState(false);

  const handleClose = () => {
    closePopup(); // Call the close function passed from the play.js
  };
  const handleFight = () => {
    setFightOptions(true);
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
        <h2>Enemy Encountered!</h2>
        <button type="button" onClick={() => handleFight()}>
          {" "}
          Fight{" "}
        </button>
        <button type="button" onClick={() => handleClose()}>
          {" "}
          Run{" "}
        </button>
        {fightOptions && (
          <FightBox closeFightBox={() => setFightOptions(false)} />
        )}
      </div>
    </div>
  );
}

FightEnemy.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

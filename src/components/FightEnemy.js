import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/FightEnemy.module.css";

import FightBox from "./FightBox";

export default function FightEnemy({
  closePopup,
  fightAction,
  setGeneratedText,
  setTextPrompt,
}) {
  const [fightOptions, setFightOptions] = useState(false);

  const handleClose = () => {
    setGeneratedText(`You run away`);
    setTimeout(
      () =>
        setTextPrompt(
          `I'm a fantasy character, I ran away from an enemy, describe what happens.`,
        ),
      2000,
    );
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
          <FightBox
            closeFightBox={() => setFightOptions(false)}
            fightAction={fightAction}
          />
        )}
      </div>
    </div>
  );
}

FightEnemy.propTypes = {
  closePopup: PropTypes.func.isRequired,
  fightAction: PropTypes.func.isRequired,
  setGeneratedText: PropTypes.func.isRequired,
  setTextPrompt: PropTypes.func.isRequired,
};

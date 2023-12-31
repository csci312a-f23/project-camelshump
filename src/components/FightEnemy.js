import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../styles/FightEnemy.module.css";

import FightBox from "./FightBox";
import ItemBox from "./ItemBox";
import StatsShape from "./StatsShape";

export default function FightEnemy({
  inventory,
  closePopup,
  fightAction,
  itemAction,
  generatedText,
  setGeneratedText,
  setTextPrompt,
  classWeapon,
  enemy,
}) {
  const [fightOptions, setFightOptions] = useState(false);
  const [itemOptions, setItemOptions] = useState(false);

  const handleClose = () => {
    setGeneratedText(`${generatedText}\nYou run away`);
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

  // useEffects to keep only one box open at once, can probably be improved
  useEffect(() => {
    if (itemOptions) setFightOptions(false);
  }, [itemOptions]);

  useEffect(() => {
    if (fightOptions) setItemOptions(false);
  }, [fightOptions]);

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
        <button type="button" onClick={() => setItemOptions(true)}>
          {" "}
          Item{" "}
        </button>
        <button type="button" onClick={() => handleClose()}>
          {" "}
          Run{" "}
        </button>
        <div className={styles.art}>
          <pre>{enemy.art}</pre>
        </div>
        {fightOptions && (
          <FightBox
            closeFightBox={() => setFightOptions(false)}
            fightAction={fightAction}
            classWeapon={classWeapon}
          />
        )}
        {itemOptions && (
          <ItemBox
            inventory={inventory}
            closeItemBox={() => setItemOptions(false)}
            itemAction={itemAction}
          />
        )}
      </div>
    </div>
  );
}

FightEnemy.propTypes = {
  inventory: PropTypes.arrayOf(Object).isRequired,
  closePopup: PropTypes.func.isRequired,
  fightAction: PropTypes.func.isRequired,
  itemAction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  generatedText: PropTypes.string,
  setGeneratedText: PropTypes.func.isRequired,
  setTextPrompt: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  classWeapon: PropTypes.string,
  enemy: StatsShape.isRequired,
};

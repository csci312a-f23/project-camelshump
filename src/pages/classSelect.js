/*
 * classSelect.js
 */
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import styles from "../styles/Classes.module.css";
import CHARACTERS from "../components/Character";
import StatBar from "../components/Statbar";

export default function ClassSelector({ setClassName }) {
  const router = useRouter();

  const handleClick = (selection) => {
    setClassName(selection);
    router.push("/play");
  };

  const warriorObj = CHARACTERS.find((elem) => elem.name === "warrior");
  const mageObj = CHARACTERS.find((elem) => elem.name === "mage");

  const rogueObj = CHARACTERS.find((elem) => elem.name === "rogue");

  const maxHealth = 60;

  return (
    <main className={styles.gridContainer}>
      <div
        className={styles.warrior}
        id={styles.class}
        onClick={() => handleClick("warrior")}
      >
        <div>Warrior</div>
        <div className={styles.art}>
          <pre>{warriorObj.art}</pre>
        </div>
        <div className={styles.stats}>
          <StatBar
            label="Health"
            value={warriorObj.health}
            maxValue={maxHealth}
          />
          <StatBar label="Strength" value={warriorObj.strength} />
          <StatBar label="Defense" value={warriorObj.defense} />
          <StatBar label="Speed" value={warriorObj.speed} />
          <StatBar label="Intelligence" value={warriorObj.intelligence} />
          <StatBar label="Rizz" value={warriorObj.rizz} />
        </div>
      </div>
      <div
        className={styles.mage}
        id={styles.class}
        onClick={() => handleClick("mage")}
      >
        <div>Mage</div>
        <div className={styles.art}>
          <pre>{mageObj.art}</pre>
        </div>
        <div className={styles.stats}>
          <StatBar label="Health" value={mageObj.health} maxValue={maxHealth} />
          <StatBar label="Strength" value={mageObj.strength} />
          <StatBar label="Defense" value={mageObj.defense} />
          <StatBar label="Speed" value={mageObj.speed} />
          <StatBar label="Intelligence" value={mageObj.intelligence} />
          <StatBar label="Rizz" value={mageObj.rizz} />
        </div>
      </div>
      <div
        className={styles.rogue}
        id={styles.class}
        onClick={() => handleClick("rogue")}
      >
        <div>Rogue</div>
        <div className={styles.art}>
          <pre>{rogueObj.art}</pre>
        </div>
        <div className={styles.stats}>
          <StatBar
            label="Health"
            value={rogueObj.health}
            maxValue={maxHealth}
          />
          <StatBar label="Strength" value={rogueObj.strength} />
          <StatBar label="Defense" value={rogueObj.defense} />
          <StatBar label="Speed" value={rogueObj.speed} />
          <StatBar label="Intelligence" value={rogueObj.intelligence} />
          <StatBar label="Rizz" value={rogueObj.rizz} />
        </div>
      </div>
    </main>
  );
}

ClassSelector.propTypes = {
  setClassName: PropTypes.func.isRequired,
};

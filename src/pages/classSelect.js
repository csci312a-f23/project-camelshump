/*
 * classSelect.js
 */
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import styles from "../styles/Classes.module.css";
import CHARACTERS from "../components/Character";

export default function ClassSelector({ setClassName }) {
  const router = useRouter();

  const handleClick = (selection) => {
    setClassName(selection);
    router.push("/play");
  };

  return (
    <main className={styles.gridContainer}>
      <div
        className={styles.warrior}
        id={styles.class}
        onClick={() => handleClick("warrior")}
      >
        <div>Warrior</div>
        <div className={styles.art}>
          <pre>{CHARACTERS.find((elem) => elem.name === "warrior").art}</pre>
        </div>
      </div>
      <div
        className={styles.mage}
        id={styles.class}
        onClick={() => handleClick("mage")}
      >
        <div>Mage</div>
        <div className={styles.art}>
          <pre>{CHARACTERS.find((elem) => elem.name === "mage").art}</pre>
        </div>
      </div>
      <div
        className={styles.rogue}
        id={styles.class}
        onClick={() => handleClick("rogue")}
      >
        <div>Rogue</div>
        <div className={styles.art}>
          <pre>{CHARACTERS.find((elem) => elem.name === "rogue").art}</pre>
        </div>
      </div>
    </main>
  );
}

ClassSelector.propTypes = {
  setClassName: PropTypes.func.isRequired,
};

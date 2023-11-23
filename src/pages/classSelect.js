/*
 * menu.js
 */
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import styles from "../styles/Classes.module.css";

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
      </div>
      <div
        className={styles.sage}
        id={styles.class}
        onClick={() => handleClick("mage")}
      >
        <div>Mage</div>
      </div>
      <div
        className={styles.rogue}
        id={styles.class}
        onClick={() => handleClick("rogue")}
      >
        <div>Rogue</div>
      </div>
    </main>
  );
}

ClassSelector.propTypes = {
  setClassName: PropTypes.func.isRequired,
};

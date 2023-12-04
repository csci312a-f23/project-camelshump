/*
 * index.js
 *
 *  call Traversal everytime a key is clicked
 */
// import MapJSON from "../components/MapJSON";

import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styles from "../styles/Menu.module.css";

export default function CamelsHump({ setCurrentId }) {
  const router = useRouter();
  const { data: session } = useSession();
  const handleClick = (condition) => {
    switch (condition) {
      case "new":
        setCurrentId();
        router.push("/classSelect");
        break;

      case "load":
        setCurrentId(2);
        router.push("/play"); // obviously change routes as things develop
        break;

      default:
        break;
    }
  };

  const menuArt = `
		      _ \n
                     /#\\ \n
                    /###\\     /\\ \n
                   /  ###\\   /##\\  /\\ \n
                  /      #\\ /####\\/##\\ \n
                 /  /      /   # /  ##\\             _       /\\\n
               // //  /\\  /    _/  /  #\\ _         /#\\    _/##\\\n
              // /   /  \\     /   /    #\\ \\      _/###\\_ /   ##\\\n
             /  \\   / .. \\   / /   _   { \\ \\   _/       / //    \n
     /\\     /    /\\  ...  \\_/   / / \\   } \\ | /  /\\  \\ /  _  \\\\ \n
  _ /  \\  /// / .\\  ..%:.  /... /\\ . \\ {:  \\   /. \\     / \\\\ \n 
 /.\\ .\\.\\// \\/... \\.::::..... _/..\\ ..\\:|:. .  / .. \\  \\   \\\\ \\ \n 
/...\\.../..:.\\. ..:::::::..:..... . ...\\{:... / %... \\/..%. \\ \\\\ \n
 .:..\\:..:::....:::;;;;;;::::::::.:::::.\\}.....::%.:. \\ .:::. \\\\ \n
::::...:::;;:::::;;;;;;;;;;;;;;:::::;;::{:::::::;;;:..  .:;:... \n`;
  return (
    <main className={styles.gridContainer}>
      <pre className={styles.art}>{menuArt}</pre>
      <button
        type="button"
        className={styles.button1}
        onClick={() => handleClick("new")}
        disabled={!session}
      >
        New Game
      </button>
      <button
        type="button"
        className={styles.button2}
        onClick={() => handleClick("load")}
        disabled={!session}
      >
        Load Game
      </button>
    </main>
  );
}

CamelsHump.propTypes = {
  setCurrentId: PropTypes.func.isRequired,
};

/*
 * index.js
 *
 *  call Traversal everytime a key is clicked
 */
// import MapJSON from "../components/MapJSON";

import { useRouter } from "next/router";
import styles from "../styles/Menu.module.css";

export default function CamelsHump() {
  const router = useRouter();
  const handleClick = (condition) => {
    switch (condition) {
      case "new":
        router.push("/classSelect");
        break;

      case "load":
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
      >
        New Game
      </button>
      <button
        type="button"
        className={styles.button2}
        onClick={() => handleClick("load")}
      >
        Load Game
      </button>
    </main>
  );
}

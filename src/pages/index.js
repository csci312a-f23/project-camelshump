/*
 * index.js
 *
 *  call Traversal everytime a key is clicked
 */
// import MapJSON from "../components/MapJSON";

import { useRouter } from "next/router";

export default function CamelsHump() {
  const router = useRouter();
  const handleClick = (condition) => {
    switch (condition) {
      case "new":
        router.push("/play");
        break;

      case "break":
        router.push("/play"); // obviously change routes as things develop
        break;

      default:
        break;
    }
  };

  return (
    <main>
      <div>Main Menu</div>
      <button type="button" onClick={() => handleClick("new")}>
        New Game
      </button>
      <button type="button" onClick={() => handleClick("load")}>
        Load Game
      </button>
    </main>
  );
}

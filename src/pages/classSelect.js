/*
 * menu.js
 */
import { useRouter } from "next/router";

export default function ClassSelector() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/play");
  };

  return (
    <main className="gridContainer">
      <div className="warriorContainer" onClick={() => handleClick("warrior")}>
        <div>Warrior</div>
      </div>
      <div className="mageContainer" onClick={() => handleClick("mage")}>
        <div>Mage</div>
      </div>
      <div className="rogueContainer" onClick={() => handleClick("rogue")}>
        <div>Rogue</div>
      </div>
    </main>
  );
}

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
        <div>
          Warrior
          <br />
          <br />
          Warrior class begins with a sword. This is a basic class with high
          attack and defense who loves to fight.
        </div>
      </div>
      <div className="mageContainer" onClick={() => handleClick("mage")}>
        <div>
          Mage
          <br />
          <br />
          Mage is a class that starts with a staff. This class specializes in
          magic and spells. These include attack and healing.
        </div>
      </div>
      <div className="rogueContainer" onClick={() => handleClick("rogue")}>
        <div>
          Rogue
          <br />
          <br />
          Rogue is a class that starts with a knife. This class specializes in
          avoiding being detected. Although it does not have strong attack or
          defense, it cannot be blocked.
        </div>
      </div>
    </main>
  );
}

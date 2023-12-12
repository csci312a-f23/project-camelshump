import { render } from "@testing-library/react";
import FightEnemy from "./FightEnemy";

describe("FightEnemy: handles initialization", () => {
  test("FightEnemy: Renders", () => {
    const handler = jest.fn();

    const fakeEnemy = {
      name: "Fake Enemy",
      health: 100,
      strength: 10,
      defense: 5,
      intelligence: 5,
      speed: 5,
      rizz: 0,
      xp: 0,
      art: "Fake Enemy Art",
      stamina: 50,
      level: 2,
      maxHealth: 80,
    };

    render(
      <FightEnemy
        inventory={[]}
        closePopup={handler}
        fightAction={handler}
        itemAction={handler}
        setGeneratedText={handler}
        setTextPrompt={handler}
        classWeapon=""
        enemy={fakeEnemy}
      />,
    );
  });
});

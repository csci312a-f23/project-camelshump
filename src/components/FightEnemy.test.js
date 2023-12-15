import { render, screen, fireEvent } from "@testing-library/react";
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

describe("FightEnemy: Buttons fire and render sub-components:", () => {
  test("Opening fight closes item and vice versa", () => {
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
        inventory={[{ name: "A", quantity: 1 }]}
        closePopup={handler}
        fightAction={handler}
        itemAction={handler}
        setGeneratedText={handler}
        setTextPrompt={handler}
        classWeapon="Staff"
        enemy={fakeEnemy}
      />,
    );

    expect(screen.queryByRole("button", { name: "Fight" })).toBeInTheDocument();

    fireEvent.click(screen.queryByRole("button", { name: "Fight" }));

    // check if fightbox was rendered by looking at one of its buttons
    expect(screen.queryByRole("button", { name: "Punch" })).toBeInTheDocument();

    fireEvent.click(screen.queryByRole("button", { name: "Item" }));

    expect(screen.queryByRole("button", { name: "A" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Punch" }),
    ).not.toBeInTheDocument();
  });

  test("FightEnemy: Run closes popup", () => {
    const closePopup = jest.fn();
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
        inventory={[{ name: "A", quantity: 1 }]}
        closePopup={closePopup}
        fightAction={handler}
        itemAction={handler}
        setGeneratedText={handler}
        setTextPrompt={handler}
        classWeapon="Staff"
        enemy={fakeEnemy}
      />,
    );

    fireEvent.click(screen.queryByRole("button", { name: "Run" }));
    expect(closePopup).toHaveBeenCalled();
  });
});

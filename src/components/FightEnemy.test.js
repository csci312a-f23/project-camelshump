import { render } from "@testing-library/react";
import FightEnemy from "./FightEnemy";

describe("FightEnemy: handles initialization", () => {
  test("FightEnemy: Renders", () => {
    const handler = jest.fn();
    render(<FightEnemy closePopup={handler} fightAction={handler} />);
  });
});

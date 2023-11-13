import { render } from "@testing-library/react";
import FightBox from "./FightBox";

describe("FightBox: handles initialization", () => {
  test("FightBox: Renders", () => {
    const fightActionMock = jest.fn();
    const closeFightBoxMock = jest.fn();
    render(
      <FightBox
        fightAction={fightActionMock}
        closeFightBox={closeFightBoxMock}
      />,
    );
  });
});

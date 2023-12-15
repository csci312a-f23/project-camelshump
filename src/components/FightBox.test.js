import { render, screen, fireEvent } from "@testing-library/react";
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

describe("FightBox: Is visible and closes", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("FightBox: Is visible", () => {
    const classWeapon = "Staff";
    const fightActionMock = jest.fn();
    const closeFightBoxMock = jest.fn();
    render(
      <FightBox
        fightAction={fightActionMock}
        closeFightBox={closeFightBoxMock}
        classWeapon={classWeapon}
      />,
    );

    expect(
      screen.queryByRole("button", { name: classWeapon }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Punch" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Dance" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  test("FightBox: Closes", () => {
    const classWeapon = "Staff";
    const fightActionMock = jest.fn();
    const closeFightBoxMock = jest.fn();
    render(
      <FightBox
        fightAction={fightActionMock}
        closeFightBox={closeFightBoxMock}
        classWeapon={classWeapon}
      />,
    );

    fireEvent.click(screen.queryByRole("button", { name: "Close" }));
    expect(closeFightBoxMock).toHaveBeenCalled();
  });
});

describe("Fightbox: Buttons function", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("classWeapon calls each function", () => {
    const classWeapon = "Staff";
    const fightActionMock = jest.fn();
    const closeFightBoxMock = jest.fn();
    render(
      <FightBox
        fightAction={fightActionMock}
        closeFightBox={closeFightBoxMock}
        classWeapon={classWeapon}
      />,
    );

    fireEvent.click(screen.queryByRole("button", { name: "Punch" }));
    expect(fightActionMock).toHaveBeenCalledWith("punch");

    fireEvent.click(screen.queryByRole("button", { name: "Dance" }));
    expect(fightActionMock).toHaveBeenCalledWith("dance");
  });
});

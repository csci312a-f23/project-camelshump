import { render, screen, fireEvent } from "@testing-library/react";
import ItemBox from "./ItemBox";

describe("ItemBox: handles initialization", () => {
  test("ItemBox: Renders", () => {
    const inventory = [];
    const closeItemBox = jest.fn();
    const itemAction = jest.fn();

    render(
      <ItemBox
        inventory={inventory}
        closeItemBox={closeItemBox}
        itemAction={itemAction}
      />,
    );
  });
});

describe("ItemBox: Buttons render", () => {
  test("ItemBox: Buttons are visible", () => {
    const inventory = [{ name: "I", quantity: 1 }];
    const closeItemBox = jest.fn();
    const itemAction = jest.fn();

    render(
      <ItemBox
        inventory={inventory}
        closeItemBox={closeItemBox}
        itemAction={itemAction}
      />,
    );

    expect(screen.queryByRole("button", { name: "I" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  test("ItemBox: Buttons trigger callbacks", () => {
    const inventory = [{ name: "I", quantity: 1 }];
    const closeItemBox = jest.fn();
    const itemAction = jest.fn();

    render(
      <ItemBox
        inventory={inventory}
        closeItemBox={closeItemBox}
        itemAction={itemAction}
      />,
    );

    fireEvent.click(screen.queryByRole("button", { name: "I" }));
    expect(itemAction).toHaveBeenCalled();

    fireEvent.click(screen.queryByRole("button", { name: "Close" }));
    expect(closeItemBox).toHaveBeenCalled();
  });
});

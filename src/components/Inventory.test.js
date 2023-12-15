import { render } from "@testing-library/react";
import Inventory from "./Inventory";

const sampleItem = "I";

describe("Inventory: handles initialization", () => {
  test("Inventory: Renders", () => {
    const handler = jest.fn();
    render(
      <Inventory
        item={sampleItem}
        onItemUpdate={handler}
        inventoryList={[]}
        setInventoryList={handler}
      />,
    );
  });
});

describe("Inventory: adds item to list", () => {
  test("Inventory: item adddition triggers callbacks", () => {
    const onItemUpdate = jest.fn();
    const setInventoryList = jest.fn();

    render(
      <Inventory
        item={sampleItem}
        onItemUpdate={onItemUpdate}
        inventoryList={[]}
        setInventoryList={setInventoryList}
      />,
    );
    expect(onItemUpdate).toHaveBeenCalled();
    expect(setInventoryList).toHaveBeenCalledWith([{ name: "I", quantity: 1 }]);
  });
});

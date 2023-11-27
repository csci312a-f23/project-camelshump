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

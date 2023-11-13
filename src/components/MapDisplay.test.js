import { render } from "@testing-library/react";
import MapDisplay from "./MapDisplay";

const currentMapMock = [
  [Array.from("abc"), Array.from("def"), Array.from("ghi")],
]; // change this to smth sensicle later
const positionMock = [0, 0, 0];

describe("MapDisplay: handles initialization", () => {
  test("MapDisplay: Renders", () => {
    const handler = jest.fn();
    render(
      <MapDisplay
        currentMap={currentMapMock}
        position={positionMock}
        updateItem={handler}
      />,
    );
  });
});

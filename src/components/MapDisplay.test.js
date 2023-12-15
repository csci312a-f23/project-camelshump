import { render, screen } from "@testing-library/react";
import MapDisplay from "./MapDisplay";

const currentMapMock = [
  [[["-", "-", "-"]], [["-", "-", "-"]], [["-", "-", "-"]]],
];
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

describe("MapDisplay: visibility tests", () => {
  test("MapDisplay: character is visible", () => {
    const handler = jest.fn();
    render(
      <MapDisplay
        currentMap={currentMapMock}
        position={positionMock}
        updateItem={handler}
      />,
    );
    expect(screen.queryByText("X")).toBeInTheDocument();
  });
});

describe("MapDisplay: callback tests", () => {
  test("MapDisplay: updateItem is called", () => {
    const handler = jest.fn();
    const itemMapMock = [
      [[["A", "-", "-"]], [["-", "-", "-"]], [["-", "-", "-"]]],
    ];
    render(
      <MapDisplay
        currentMap={itemMapMock}
        position={positionMock}
        updateItem={handler}
      />,
    );
    expect(handler).toHaveBeenCalled();
  });
});

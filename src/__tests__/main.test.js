import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import CamelsHump from "@/pages/index";
import GameViewer from "@/pages/play";

// eslint-disable-next-line global-require
jest.mock("next/router", () => require("next-router-mock"));

mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/",
    "/play",
  ]),
);
describe("End-to-end testing", () => {
  test("Render index.js component", () => {
    render(<CamelsHump />);
  });
  test("Render GameViewer page", () => {
    render(<GameViewer />);
  });
});

describe("Menu: Button tests", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });
  test("Menu: New and load game buttons are visible", () => {
    render(<CamelsHump />);
    expect(
      screen.queryByRole("button", { name: "New Game" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Load Game" }),
    ).toBeInTheDocument();
  });
});

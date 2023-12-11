import { render, screen, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import CamelsHump from "@/pages/index";
import GameViewer from "@/pages/play";
import { getServerSession } from "next-auth/next";

// eslint-disable-next-line global-require
jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next-auth/next");

mockRouter.useParser(
  createDynamicRouteParser(["/", "/play", "/classSelect", "/load"]),
);
describe("End-to-end testing", () => {
  test("Render Main Menu component", () => {
    render(<CamelsHump />);
  });
  test("Render GameViewer page", () => {
    render(<GameViewer className="warrior" />);
  });
});

describe("Menu: Button tests", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
    getServerSession.mockResolvedValue({
      user: {
        id: 1,
      },
    });
  });
  afterEach(() => {
    getServerSession.mockReset();
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
  test("Menu: New Game directs to class selection", () => {
    render(<CamelsHump />);
    const newGame = screen.queryByRole("button", { name: "New Game" });
    fireEvent.click(newGame);
    expect(mockRouter.pathname).toBe("/classSelect");
  });
  test("Menu: Load Game directs to play screen", () => {
    render(<CamelsHump />);
    const loadGame = screen.queryByRole("button", { name: "Load Game" });
    fireEvent.click(loadGame);
    expect(mockRouter.pathname).toBe("/play");
  });
});

describe("Play: Button tests", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/play");
    getServerSession.mockResolvedValue({
      user: {
        id: 1,
      },
    });
  });
  afterEach(() => {
    getServerSession.mockReset();
  });
  test("Play: Quit button is visible", () => {
    render(<GameViewer className="mage" />);
    expect(screen.queryByRole("button", { name: "Quit" })).toBeInTheDocument();
  });
  test("Play: Quit button routes back to menu", () => {
    render(<GameViewer className="rogue" />);

    const quit = screen.queryByRole("button", { name: "Quit" });
    fireEvent.click(quit);
    expect(mockRouter.pathname).toBe("/");
  });
});

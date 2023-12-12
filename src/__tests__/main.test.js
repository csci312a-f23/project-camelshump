import { render, screen, fireEvent } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { useSession } from "next-auth/react";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import CamelsHump from "@/pages/index";
import GameViewer from "@/pages/play";

jest.mock("next-auth/react");

// eslint-disable-next-line global-require
jest.mock("next/router", () => require("next-router-mock"));

mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/",
    "/play",
    "/classSelect",
    "/load",
  ]),
);

describe("End-to-end testing", () => {
  beforeEach(() => {
    useSession.mockReturnValue({
      data: {
        user: { id: 1 },
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
      },
      status: "authenticated",
    });
  });

  afterEach(() => {
    // Clear all mocks between tests
    jest.resetAllMocks();
  });

  test("Render Main Menu component", () => {
    render(<CamelsHump pageProps={{ session: undefined }} />);
  });

  test("Render GameViewer page", () => {
    render(<GameViewer className="warrior" />);
  });
});

describe("Menu: Button tests", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");

    useSession.mockReturnValue({
      data: {
        user: { id: 1 },
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
      },
      status: "authenticated",
    });
  });

  afterEach(() => {
    // Clear all mocks between tests
    jest.resetAllMocks();
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
    render(<CamelsHump setCurrentId={() => {}} />);
    const newGame = screen.queryByRole("button", { name: "New Game" });
    fireEvent.click(newGame);
    expect(mockRouter.pathname).toBe("/classSelect");
  });
  test("Menu: Load Game directs to load screen", () => {
    render(<CamelsHump />);
    const loadGame = screen.queryByRole("button", { name: "Load Game" });
    fireEvent.click(loadGame);
    expect(mockRouter.pathname).toBe("/load");
  });
});

describe("Play: Button tests", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/play");

    useSession.mockReturnValue({
      data: {
        user: { id: 1 },
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
      },
      status: "authenticated",
    });
  });

  afterEach(() => {
    // Clear all mocks between tests
    jest.resetAllMocks();
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

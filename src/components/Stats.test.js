import { render, screen } from "@testing-library/react";
import Stats from "./Stats";

const mockStats = {
  name: "warrior",
  weapon: "Sword",
  health: 30,
  strength: 4,
  speed: 7,
  defense: 16,
  intelligence: 3,
  rizz: 10,
  xp: 0,
  level: 1,
  art: "",
};

describe("Stats: handles initialization", () => {
  test("Stats: Renders", () => {
    render(<Stats stats={mockStats} isEnemy={false} />);
  });
});

describe("Stats: stats are visible", () => {
  test("Stats: Statbars are visible", () => {
    render(<Stats stats={mockStats} isEnemy={false} />);

    expect(screen.queryByText("Strength")).toBeInTheDocument();
    expect(screen.queryByText("Defense")).toBeInTheDocument();
    expect(screen.queryByText("Stamina")).toBeInTheDocument();
    expect(screen.queryByText("Speed")).toBeInTheDocument();
    expect(screen.queryByText("Intelligence")).toBeInTheDocument();
    expect(screen.queryByText("Rizz")).toBeInTheDocument();
  });

  test("Stats: Level is visible", () => {
    render(<Stats stats={mockStats} isEnemy={false} />);

    expect(screen.queryByText("Level: 1")).toBeInTheDocument();
  });

  test("Stats: Level is not visible when isEnemy is true", () => {
    render(<Stats stats={mockStats} isEnemy />);

    expect(screen.queryByText("Level: 1")).not.toBeInTheDocument();
  });
});

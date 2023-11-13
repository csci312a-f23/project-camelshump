import { render } from "@testing-library/react";
import MapJSON from "./MapJSON";

describe("MapJSON: handles initialization", () => {
  test("MapJSON: Renders", () => {
    const numberMock = 4;
    // do we want to render here? this isn't a DOM component...
    render(<MapJSON sectionLength={numberMock} numSections={numberMock} />);
  });
});

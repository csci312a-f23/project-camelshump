import { render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import CamelsHump from "@/pages/index";

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
});

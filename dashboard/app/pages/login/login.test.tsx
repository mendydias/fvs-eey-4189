import { screen } from "@testing-library/react";
import render from "~/test-utils/renderer";
import "@testing-library/jest-dom";
import { createRoutesStub } from "react-router";
import { it, describe, expect } from "vitest";
import LoginPage from "~/pages/login/login";

describe("Login UI", function () {
  it("should render a login form and its corresponding headings", function () {
    const RouteStub = createRoutesStub([
      {
        path: "/",
        Component: LoginPage,
      },
    ]);

    render(<RouteStub initialEntries={["/"]} />);

    expect(screen.getByText("FVS")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("should render an error message if email address and password are empty when logging in", function () {});
});

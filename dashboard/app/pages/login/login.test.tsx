import { act, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import render from "~/test-utils/renderer";
import "@testing-library/jest-dom";
import { createRoutesStub } from "react-router";
import { it, describe, expect, vi, beforeEach, beforeAll } from "vitest";
import LoginPage from "~/pages/login/login";
import * as authService from "~/services/auth-service";

const loginSpy = vi.spyOn(authService, "login");

describe("Login UI", function () {
  beforeAll(() => {
    loginSpy.mockReset();
    loginSpy.mockImplementation(() => Promise.resolve({ token: "abcdefgh" }));
  });

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

  it("should render an error message if email address and password are empty when logging in", async function () {
    const RouteStub = createRoutesStub([
      {
        path: "/",
        Component: LoginPage,
        action() {
          return {
            status: "error",
            intent: undefined,
            initialValue: {},
            error: {
              email: ["Email address cannot be empty."],
              password: ["Password cannot be empty."],
            },
            state: undefined,
            fields: ["email", "password"],
          };
        },
      },
    ]);

    render(<RouteStub initialEntries={["/"]} />);

    const loginButton = screen.getByRole("button", { name: "Login" });
    await act(async () => {
      loginButton.click();
    });
    await waitFor(() => screen.findByText("Email address cannot be empty."));
    await waitFor(() => screen.findByText("Password cannot be empty."));
  });

  it("should render an error message if the email address is invalid", async function () {
    // Setup router for isolated testing
    const RouteStub = createRoutesStub([
      {
        path: "/",
        Component: LoginPage,
        action() {
          return {
            status: "error",
            intent: undefined,
            initialValue: {},
            error: {
              email: ["Email address is invalid."],
              password: ["Password cannot be empty."],
            },
            state: undefined,
            fields: ["email", "password"],
          };
        },
      },
    ]);

    render(<RouteStub initialEntries={["/"]} />);

    // Get the email input, the login button and simulate the user typing an invalid email address
    const emailInput = screen.getByPlaceholderText("Username");
    const loginButton = screen.getByRole("button", { name: "Login" });
    const user = userEvent.setup();
    await act(async () => {
      await user.type(emailInput, "john.smith.kmail");
      await user.click(loginButton);
    });

    // Poll for the error message to appear
    await waitFor(() => screen.findByText("Email address is invalid."));
  });
});

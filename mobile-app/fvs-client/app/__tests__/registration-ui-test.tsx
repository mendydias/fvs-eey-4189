import { renderRouter, screen, userEvent } from "expo-router/testing-library";
import LoginPage from "..";
import RegisterDetailsPage from "../register/details";

let routes = {
  index: jest.fn(() => <LoginPage />),
  "register/details": jest.fn(() => <RegisterDetailsPage />),
};

jest.mock("expo-font");

describe("Basic user registration flow", function () {
  it("pressing register redirects to registration page", async function () {
    renderRouter(routes, { initialUrl: "/" });

    const driver = userEvent.setup();
    const registerBtn = screen.getByRole("link", { name: "Register" });
    await driver.press(registerBtn);
    expect(screen).toHavePathname("/register/details");
  });
});

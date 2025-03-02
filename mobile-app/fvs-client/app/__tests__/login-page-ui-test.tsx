import { render, screen, userEvent } from "@testing-library/react-native";
import LoginPage from "@/app/index";
import { renderRouter } from "expo-router/testing-library";
import RegisterDetailsPage from "../register/details";

jest.mock("expo-font");

describe("<LoginPage />", () => {
  it("should render all elements correctly", function () {
    render(<LoginPage />);
    // headings
    expect(screen.getByText("FVS")).toBeTruthy();
    expect(screen.getByText("Welcome!")).toBeTruthy();
    // buttons
    expect(screen.getByRole("button", { name: "Login" }));
    expect(screen.getByRole("link", { name: "Register" }));
  });

  it("should redirect to registration page if register button is pressed", async function () {
    renderRouter(
      {
        index: jest.fn(() => <LoginPage />),
        "/register/details": jest.fn(() => <RegisterDetailsPage />),
      },
      { initialUrl: "/" },
    );
    const user = userEvent.setup();
    await user.press(screen.getByRole("link", { name: "Register" }));
    expect(screen).toHavePathname("/register/details");
  });
});

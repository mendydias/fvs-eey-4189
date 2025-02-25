import { render, screen } from "@testing-library/react-native";
import LoginPage from "..";

describe("<LoginPage /> renders correctly", function () {
  it("should display the logo text and welcome correctly", function () {
    render(<LoginPage />);
    screen.getByText("FVS");
    screen.getByText("Welcome!");
  });

  it("should display form input section for nic and password input", function () {
    render(<LoginPage />);
    screen.getByRole("text", { name: "NIC" });
    screen.getByRole("text", { name: "Password" });
  });

  it("should display two buttons: one to login and one to register", function () {
    render(<LoginPage />);
    screen.getByRole("button", { name: "Login" });
    screen.getByRole("link", { name: "Register" });
  });
});

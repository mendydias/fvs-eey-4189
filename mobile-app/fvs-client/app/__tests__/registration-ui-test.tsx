import { renderRouter, screen, userEvent } from "expo-router/testing-library";
import LoginPage from "..";
import RegisterDetailsPage from "../register/details";
import { GENDERS, Voter } from "@/models/voter";

let routes = {
  index: jest.fn(() => <LoginPage />),
  "/register/details": jest.fn(() => <RegisterDetailsPage />),
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
  it("completing the registration form correctly should display a success page", async function () {
    renderRouter(routes, { initialUrl: "/register/details" });
    // get the field elements
    const driver = userEvent.setup();
    // TODO: change the queries to get by test id
    const nicField = screen.getByRole("text", {
      name: "National Identification Number",
    });
    const nameField = screen.getByRole("text", { name: "Full name" });
    const dobField = screen.getByRole("text", { name: "Date of birth" });
    const genderField = screen.getByRole("text", { name: "Gender" });
    const emailField = screen.getByRole("text", { name: "Email address" });
    // get the register button
    const registerButton = screen.getByRole("button", { name: "Register!" });
    // the voter entity to compare it to
    const voter: Voter = {
      nic: "941993850V",
      fullname: "Umendya Ranmal Dias",
      dob: new Date("1994-07-17"),
      email: "u.ranmal.dias@gmail.com",
      gender: GENDERS[0],
    };
    // input the voter
    driver.type(nicField, voter.nic);
    driver.type(nameField, voter.fullname);
    driver.type(dobField, voter.dob.toTimeString());
    driver.type(genderField, voter.gender);
    driver.type(emailField, voter.email);
    driver.press(registerButton);
    // success message is displayed
    screen.getByText("Successfully registered!");
  });
});

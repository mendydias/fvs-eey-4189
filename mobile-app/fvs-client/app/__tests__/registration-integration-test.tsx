/**
 * @module RegistrationServicesTest
 * @description This module contains tests for the Registration Services.
 * It verifies the functionality of user registration.
 */
import LoginPage from "@/app/index";
import RegisterDetailsPage from "@/app/register/details";
import RegisterPasswordPage from "@/app/register/password";
import { Voter } from "@/models/voter";
import { renderRouter, screen, userEvent } from "expo-router/testing-library";
import registrationService from "@/services/registration";

jest.spyOn(registrationService, "registerVoter");
jest.mock("expo/fetch", () => ({
  fetch: jest.fn(() =>
    Promise.resolve({ json: jest.fn(() => Promise.resolve({ status: 200 })) }),
  ),
}));
jest.mock("expo-font");

const voter: Voter = {
  nic: "sdfdf234233234",
  fullname: "John Smith",
  email: "test.mail@kmail.com",
  dob: new Date("2005-10-17"),
  gender: "Male",
  password: "",
};

const testPassword = "password123";

describe("Registration Services", function () {
  // test mimics the entire user registration workflow
  it("should register a new user", async function () {
    renderRouter(
      {
        index: jest.fn(() => <LoginPage />),
        "/register/details": jest.fn(() => <RegisterDetailsPage />),
        "/register/password": jest.fn(() => <RegisterPasswordPage />),
      },
      { initialUrl: "/" },
    );
    const user = userEvent.setup();
    // fill in the registration details
    const loginRegisterButton = screen.getByText("Register");
    await user.press(loginRegisterButton);
    const nic = screen.getByPlaceholderText("NIC");
    const fullname = screen.getByPlaceholderText("Full name");
    const email = screen.getByPlaceholderText("Email address");
    const detailsRegisterButton = screen.getByText("Register!");
    await user.type(nic, voter.nic);
    await user.type(fullname, voter.fullname);
    await user.type(email, voter.email);
    await user.press(detailsRegisterButton);
    // create the password
    const password = screen.getByPlaceholderText("Password");
    const confirmPassword = screen.getByPlaceholderText("Confirm Password");
    await user.type(password, testPassword);
    await user.type(confirmPassword, testPassword);
    const credentialsRegisterButton = screen.getByText("Register!");
    await user.press(credentialsRegisterButton);
    // check if the service has been called
    expect(registrationService.registerVoter).toHaveBeenCalledWith(voter);
  });
  // TODO: check if a duplicate user is created, what error messages are shown.
});

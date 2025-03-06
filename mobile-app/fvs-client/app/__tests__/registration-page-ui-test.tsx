/**
 * @module RegistrationPageUITest
 * @description This module contains UI tests for the Registration Page.
 * It verifies the user interface elements and interactions on the registration page.
 */
import {
  render,
  renderRouter,
  screen,
  userEvent,
} from "expo-router/testing-library";
import RegisterDetailsPage from "@/app/register/details";
import RegisterPasswordPage from "@/app/register/password";
import LoginPage from "..";

jest.mock("expo-font");
jest.mock("@expo/vector-icons");

// common voter model used in testing
const voter = {
  nic: "814109192V",
  fullname: "John Smith",
  dob: new Date("2005-10-17"),
  gender: "Male",
  email: "john.smith05@kmail.net",
};

describe("<RegisterDetailsPage />", function () {
  it("should redirect and render everything correctly", async function () {
    render(<RegisterDetailsPage />);
    // heading renders correctly
    expect(screen.getByText("FVS")).toBeTruthy();
    expect(screen.getByText("User Registration")).toBeTruthy();
    // inputs render correctlu
    expect(screen.getByText("National Identification Number")).toBeTruthy();
    expect(screen.getByText("Full name")).toBeTruthy();
    expect(screen.getByText("Date of birth")).toBeTruthy();
    expect(screen.getByText("Email address")).toBeTruthy();
    // button renders correctly
    expect(screen.getByText("Register!")).toBeTruthy();
  });

  it("should enter input correctly", async function () {
    render(<RegisterDetailsPage />);
    // get all the text inputs
    const nic = screen.getByPlaceholderText("NIC");
    const fullname = screen.getByPlaceholderText("Full name");
    const email = screen.getByPlaceholderText("Email address");
    // simulate user typing
    const user = userEvent.setup();
    await user.type(nic, voter.nic);
    await user.type(fullname, voter.fullname);
    await user.type(email, voter.email);
    // test that the renders update correctly
    expect(nic.props.value).toBe(voter.nic);
    expect(fullname.props.value).toBe(voter.fullname);
    expect(email.props.value).toBe(voter.email);
  });

  it("should render the selected gender correctly", async function () {
    render(<RegisterDetailsPage />);
    // get the two options in the custom component
    const maleOption = screen.getByText("Male");
    const femaleOption = screen.getByText("Female");
    // simulate the selection of an option
    const user = userEvent.setup();
    await user.press(femaleOption);
    // the selected option must have the correct styling applied to indicate its
    // current selection
    expect(femaleOption.parent.parent.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: "#2D3648",
        }),
      ]),
    );
    // likewise, the unselected option must indicate that it is not the current
    // selection
    expect(maleOption.parent.props.style).toEqual(
      expect.objectContaining({ color: "#2D3648" }),
    );
  });

  it("should display error messages if input fields are empty when pressing register button", async function () {
    render(<RegisterDetailsPage />);
    // the default behavior should render an empty form
    // locate the register button and press it
    const registerButton = screen.getByText("Register!");
    const user = userEvent.setup();
    await user.press(registerButton);
    // validation messages should be present
    expect(screen.getByText("Your NIC cannot be empty")).toBeTruthy();
    expect(screen.getByText("Your email address cannot be empty")).toBeTruthy();
    expect(screen.getByText("Your name cannot be empty")).toBeTruthy();
  });

  it("should display error message if email is in the wrong format", async function () {
    render(<RegisterDetailsPage />);
    // cannot leave fields empty, so we query and type in the other fields.
    const nic = screen.getByPlaceholderText("NIC");
    const fullname = screen.getByPlaceholderText("Full name");
    const email = screen.getByPlaceholderText("Email address");
    const registerButton = screen.getByText("Register!");
    const user = userEvent.setup();
    await user.type(nic, voter.nic);
    await user.type(fullname, voter.fullname);
    // type an invalid email address
    await user.type(email, "sdfsfd");
    await user.press(registerButton);
    // test error message is displayed
    expect(screen.getByText("Enter a valid email address")).toBeTruthy();
  });

  it("should redirect to create password page if all details are correct", async function () {
    // setup router
    renderRouter(
      {
        index: jest.fn(() => <LoginPage />),
        "/register/details": jest.fn(() => <RegisterDetailsPage />),
        "/register/password": jest.fn(() => <RegisterPasswordPage />),
      },
      { initialUrl: "/register/details" },
    );
    // fill in the form
    const nic = screen.getByPlaceholderText("NIC");
    const fullname = screen.getByPlaceholderText("Full name");
    const email = screen.getByPlaceholderText("Email address");
    const registerButton = screen.getByText("Register!");
    const user = userEvent.setup();
    await user.type(nic, voter.nic);
    await user.type(fullname, voter.fullname);
    await user.type(email, voter.email);
    await user.press(registerButton);
    // check if the router redirected to the correct page
    expect(screen).toHavePathname("/register/password");
  });
});

describe("<RegisterPasswordPage />", function () {
  it("should render everything correctly", function () {
    render(<RegisterPasswordPage />);
    expect(screen.getByText("FVS")).toBeTruthy();
    expect(screen.getByText("Create User Login Credentials")).toBeTruthy();
    expect(screen.getByText("Create a password to login:")).toBeTruthy();
    expect(screen.getByText("Password:")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeTruthy();
    expect(screen.getByText("Register!")).toBeTruthy();
  });

  it("should display error messages if password fields are empty when pressing register button", async function () {
    render(<RegisterPasswordPage />);
    const registerButton = screen.getByText("Register!");
    const user = userEvent.setup();
    await user.press(registerButton);
    // check for error messages
    expect(screen.getByText("Password cannot be empty.")).toBeTruthy();
  });

  it("should display error message if passwords do not match", async function () {
    render(<RegisterPasswordPage />);
    const password = screen.getByPlaceholderText("Password");
    const confirmPassword = screen.getByPlaceholderText("Confirm Password");
    const testPassword = "123456";
    const testConfirmPassword = "password1";
    const user = userEvent.setup();
    await user.type(password, testPassword);
    await user.type(confirmPassword, testConfirmPassword);
    const registerButton = screen.getByText("Register!");
    await user.press(registerButton);
    // check for error messages
    expect(screen.getByText("Passwords do not match.")).toBeTruthy();
  });

  it("should display password requirements on the page", function () {
    render(<RegisterPasswordPage />);
    expect(
      screen.getByText("Password must be at least 8 characters."),
    ).toBeTruthy();
    expect(
      screen.getByText("Password must contain at least one letter."),
    ).toBeTruthy();
    expect(
      screen.getByText("Password must contain at least one number."),
    ).toBeTruthy();
  });

  it("should display error message if password doesn't meet the password requirements", async function () {
    render(<RegisterPasswordPage />);
    const password = screen.getByPlaceholderText("Password");
    const registerButton = screen.getByText("Register!");
    const user = userEvent.setup();
    const testPassword1 = "secret";
    await user.type(password, testPassword1);
    await user.press(registerButton);
    expect(
      screen.getByText("Password is less than 8 characters."),
    ).toBeTruthy();
    const testPassword2 = "supersecret";
    await user.type(password, testPassword2);
    expect(
      screen.getByText(
        "Password doesn't contain a mix of letters and numbers.",
      ),
    ).toBeTruthy();
    const testPasswordLong =
      "1234234sdfsdfsdfsfsdfsdfsdfsfdsdfsfsdfsdfsdfsdfsfsdfsfsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsfsdfsdfsdfsdfsfsdsfs";
    await user.clear(password);
    await user.type(password, testPasswordLong);
    await user.press(registerButton);
    expect(
      screen.getByText("Password is greater than 50 characters."),
    ).toBeTruthy();
  });
  // TODO: test that correct password fields redirect to login page
  it("should redirect to login page if all details are correct", async function () {
    renderRouter(
      {
        index: jest.fn(() => <LoginPage />),
        "/register/details": jest.fn(() => <RegisterDetailsPage />),
        "/register/password": jest.fn(() => <RegisterPasswordPage />),
      },
      {
        initialUrl: "/register/password",
      },
    );
    // fill in the details on the password page and submit
    const registerButton = screen.getByText("Register!");
    const user = userEvent.setup();
    await user.press(registerButton);
    // Ensure that the path has redirected to the login page.
    expect(screen).toHavePathname("/");
  });
});

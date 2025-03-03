import { render, screen, userEvent } from "expo-router/testing-library";
import RegisterDetailsPage from "@/app/register/details";
import { press } from "@testing-library/react-native/build/user-event/press";

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

  // TODO: test empty text input fields cause validation errors
  it("should display error messages if input fields are empty when pressing register button", async function () {
    render(<RegisterDetailsPage />);
    // the default behavior should render an empty form
    // locate the register button and press it
    const registerButton = screen.getByText("Register!");
    const user = userEvent.setup();
    await user.press(registerButton);
    // validation messages should be present
    expect(screen.getByText("Enter a valid NIC number")).toBeTruthy();
    expect(screen.getByText("Enter a valid email address")).toBeTruthy();
    expect(screen.getByText("Your name cannot be empty")).toBeTruthy();
  });
  // TODO: test wrong email format causes a validation error
  // TODO: test correct details calls the register function redirects to create password page
});

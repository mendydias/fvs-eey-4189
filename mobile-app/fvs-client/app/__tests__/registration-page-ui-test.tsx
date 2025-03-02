import { render, screen, userEvent } from "expo-router/testing-library";
import RegisterDetailsPage from "@/app/register/details";

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
    const nic = screen.getByPlaceholderText("NIC");
    const fullname = screen.getByPlaceholderText("Full name");
    const email = screen.getByPlaceholderText("Email address");
    const user = userEvent.setup();
    await user.type(nic, voter.nic);
    await user.type(fullname, voter.fullname);
    await user.type(email, voter.email);
    expect(nic.props.value).toBe(voter.nic);
    expect(fullname.props.value).toBe(voter.fullname);
    expect(email.props.value).toBe(voter.email);
  });

  it("should render the selected gender correctly", async function () {
    render(<RegisterDetailsPage />);
    const maleOption = screen.getByText("Male");
    const femaleOption = screen.getByText("Female");
    const user = userEvent.setup();
    await user.press(femaleOption);
    expect(femaleOption.parent.parent.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: "#2D3648",
        }),
      ]),
    );
    expect(maleOption.parent.props.style).toEqual(
      expect.objectContaining({ color: "#2D3648" }),
    );
  });
});

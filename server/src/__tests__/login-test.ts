import { describe, expect, it, jest } from "@jest/globals";
import loadConfig, { loadAdminCredentials } from "../config";

jest.mock("../repositories/mockdb.ts", () => ({
  saveVoter: jest.fn(),
  saveAdmin: jest.fn(),
  saveUser: jest.fn(() => "user_1"),
  verifyUser: jest.fn(),
}));
import mockdbTest from "../repositories/mockdb";
const mockdbTestMock = mockdbTest as jest.MockedObject<typeof mockdbTest>;

const defaultAdmin = "admin@admin.com";
const defaultPassword = "admin";

describe("Default Admin Login", function () {
  it("if the environment variables for default admin credentials are not set, then the create admin function must be called with defaults", function () {
    const config = loadConfig();
    expect(config.adminCredentials.user).toBe(defaultAdmin);
    expect(config.adminCredentials.password).toBe(defaultPassword);
  });
  it("should call the database function to save the admin credentials when configuration is loaded", async function () {
    const config = loadConfig({ environment: "TESTING" });
    await loadAdminCredentials(config);
    expect(mockdbTestMock.saveUser).toBeCalledWith(
      defaultAdmin,
      defaultPassword,
    );
    expect(mockdbTestMock.saveAdmin).toBeCalled();
  });
});

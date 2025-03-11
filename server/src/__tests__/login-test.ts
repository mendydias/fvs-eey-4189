import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import loadConfig, { loadAdminCredentials } from "../config";

jest.mock("../repositories/mockdb.ts", () => ({
  saveVoter: jest.fn(),
  saveAdmin: jest.fn(),
  saveUser: jest.fn(() => "user_1"),
  verifyUser: jest.fn(),
}));
import mockdbTest, { clearDb } from "../repositories/mockdb";
const mockdbTestMock = mockdbTest as jest.MockedObject<typeof mockdbTest>;

const defaultAdmin = "admin@admin.com";
const defaultPassword = "admin";

const originalEnv = process.env;
describe("Default Admin Login", function () {
  // Reset the process environment to the original for each of the tests
  beforeEach(() => {
    process.env = { ...originalEnv };
  });
  afterEach(() => {
    process.env = originalEnv;
  });

  it("if the environment variables for default admin credentials are not set, then the create admin function must be called with defaults", function () {
    const config = loadConfig();
    expect(config.adminCredentials.user).toBe(defaultAdmin);
    expect(config.adminCredentials.password).toBe(defaultPassword);
  });

  it("should call the database function to save the admin credentials when configuration is loaded", async function () {
    const config = loadConfig({ environment: "TESTING" });
    await loadAdminCredentials(config);
    expect(mockdbTestMock.saveUser).toBeCalled();
    expect(mockdbTestMock.saveAdmin).toBeCalled();
  });

  it("config should load the correct environment variables for admin credentials", function () {
    const testAdmin = "john.smith@example.com";
    const testPassword = "password123";
    process.env.FVS_ADMIN_USER = testAdmin;
    process.env.FVS_ADMIN_PASSWORD = testPassword;
    const config = loadConfig({ environment: "TESTING" });
    expect(config.adminCredentials.user).toBe(testAdmin);
    expect(config.adminCredentials.password).toBe(testPassword);
  });
});

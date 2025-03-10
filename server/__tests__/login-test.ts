import { describe, expect, it, jest } from "@jest/globals";

import loadConfig from "../src/config";

const defaultAdmin = "admin";
const defaultPassword = "admin";

describe("Default Admin Login", function () {
  it("if the environment variables for default admin credentials are not set, then the create admin function must be called with defaults", function () {
    const config = loadConfig();
    expect(config.adminCredentials.user).toBe(defaultAdmin);
    expect(config.adminCredentials.password).toBe(defaultPassword);
  });
});

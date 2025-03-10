import { describe, expect, it, jest } from "@jest/globals";
import loadConfig, { loadAdminCredentials } from "../config";
import getUserRepository from "../repositories/user-repository";

const defaultCredentials = {
  email: "admin@admin.com",
  password: "admin",
};

describe("Login verification tests", function () {
  // TODO: Verify login succeeds for correct password
  it("should correctly verify the login credentials", async function () {
    const config = loadConfig({ environment: "TESTING" });
    await loadAdminCredentials(config);
    const repo = getUserRepository(config);
    const outcome = await repo.verifyUser(defaultCredentials);
    expect(outcome).toBe(true);
  });

  // TODO: Verify login fails for incorrect password
});

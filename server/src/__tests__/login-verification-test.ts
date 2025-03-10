import { describe, expect, it } from "@jest/globals";
import loadConfig, { loadAdminCredentials } from "../config";
import getUserRepository from "../repositories/user-repository";

const defaultCredentials = {
  email: "admin@admin.com",
  password: "admin",
};

describe("Login verification tests", function () {
  it("should correctly verify the login credentials", async function () {
    const config = loadConfig({ environment: "TESTING" });
    await loadAdminCredentials(config);
    const repo = getUserRepository(config);
    const outcome = await repo.verifyUser(defaultCredentials);
    expect(outcome).toBe(true);
  });

  it("should fail when incorrect credentials are used", async function () {
    const config = loadConfig({ environment: "TESTING" });
    await loadAdminCredentials(config);
    const repo = getUserRepository(config);
    const outcome = await repo.verifyUser({
      email: "admin@admin.com",
      password: "wrongpassword",
    });
    expect(outcome).toBe(false);
  });
});

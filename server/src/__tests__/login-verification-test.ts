import { beforeEach, describe, expect, it } from "@jest/globals";
import loadConfig, { loadAdminCredentials } from "../config";
import getUserRepository from "../repositories/user-repository";
import { clearDb } from "../repositories/mockdb";

const defaultCredentials = {
  email: "admin@admin.com",
  password: "admin",
};

describe("Login verification tests", function () {
  beforeEach(() => {
    clearDb();
  });

  it("should correctly verify the login credentials", async function () {
    const config = loadConfig({ environment: "TESTING" });
    await loadAdminCredentials(config);
    const repo = getUserRepository(config);
    const outcome = await repo.verifyUser({
      ...defaultCredentials,
      role: "admin",
    });
    expect(outcome).toBe(true);
  });

  it("should fail when incorrect credentials are used", async function () {
    const config = loadConfig({ environment: "TESTING" });
    await loadAdminCredentials(config);
    const repo = getUserRepository(config);
    const outcome = await repo.verifyUser({
      email: "admin@admin.com",
      password: "wrongpassword",
      role: "admin",
    });
    expect(outcome).toBe(false);
  });
});

import getApplication from "@";
import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import { LoginResponseSchema } from "../routes/registration-controller";

const defaultCredentials = {
  email: "admin@admin.com",
  password: "admin",
};

describe("Test exposed endpoint for admin authentication", function () {
  it("should return a 200 status code and have the correct shape when authenticating with the correct credentials", async function () {
    const { config, app } = getApplication();
    const response = await request(app).post("/login").send(defaultCredentials);
    expect(response.status).toBe(200);
    const loginResponse = LoginResponseSchema.parse(response.body);
    expect(loginResponse.token).toBeDefined();
  });
});

import getApplication from "../index";
import { describe, expect, it } from "@jest/globals";
import { LoginResponse, LoginResponseSchema } from "../routes/login-controller";
import request from "supertest";

const defaultCredentials = {
  email: "admin@admin.com",
  password: "admin",
};

describe("Test exposed endpoint for admin authentication", function () {
  it("should return a 200 status code and have the correct shape when authenticating with the correct credentials", async function () {
    console.log("Commencing test for correct password");

    const { config, app } = getApplication("TESTING");
    const response = await request(app)
      .post("/auth/login")
      .send(defaultCredentials);
    expect(response.status).toBe(200);
    const loginResponse: LoginResponse = LoginResponseSchema.parse(
      response.body,
    );
    expect(loginResponse.token).toBeDefined();
  });
});

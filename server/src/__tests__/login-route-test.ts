import getApplication from "../index";
import { describe, expect, it } from "@jest/globals";
import {
  ErrorResponse,
  ErrorResponseSchema,
  LoginResponse,
  LoginResponseSchema,
} from "../routes/login-controller";
import request from "supertest";

const defaultCredentials = {
  email: "admin@admin.com",
  password: "admin",
};

describe("Test exposed endpoint for admin authentication", function () {
  it("should return a 200 status code and have the correct shape when authenticating with the correct credentials", async function () {
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

  it("should return a 401 status code and have the correct shape when authenticating with the incorrect credentials", async function () {
    const { config, app } = getApplication("TESTING");
    const response = await request(app)
      .post("/auth/login")
      .send({ email: defaultCredentials.email, password: "wrongpassword" });
    expect(response.status).toBe(401);
    const loginResponse: ErrorResponse = ErrorResponseSchema.parse(
      response.body,
    );
    expect(loginResponse.message).toBe("Not authenticated");
  });
});

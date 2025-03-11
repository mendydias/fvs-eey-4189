import { describe, expect, it } from "@jest/globals";
import { type Voter } from "../models/registration-models";
import request from "supertest";
import getApplication from "../index";

describe("Voter CRUD tests", function () {
  it("should create a voter", async () => {
    const voter: Voter = {
      nic: "123456789",
      fullname: "John Doe",
      dob: "1990-01-01",
      gender: "m",
      email: "johndoe@example.com",
    };
    const { app, config } = getApplication("TESTING");
    const response = await request(app).post("/register/voter").send(voter);
    expect(response.status).toBe(201);
  });

  it.todo("should send back 400 if the body data is malformed");

  it.todo("should send back 401 if tried to delete without admin role");

  it.todo("should delete the voter if the bearer token has admin role");
});

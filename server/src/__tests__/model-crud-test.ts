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
      password: "1234password1234",
    };
    const { app, config } = getApplication("TESTING");
    const response = await request(app).post("/register/voter").send(voter);
    expect(response.status).toBe(201);
  });

  it("should send back 400 if the body data is malformed", async () => {
    const voter = {
      nic: "123456789",
      fullname: "John Doe",
      surname: "Doe",
      dob: "1990-01-01",
      gender: "d",
      email: "johndoe@example.com",
    };
    const { app, config } = getApplication("TESTING");
    const response = await request(app).post("/register/voter").send(voter);
    expect(response.status).toBe(400);
  });

  it.todo("should send back 40 if duplicate voter");

  it("should send back 401 if tried to delete without admin role", async () => {
    const voter = {
      nic: "4323423423kkj",
      fullname: "John Doe",
      dob: "1990-01-01",
      gender: "m",
      email: "johndoe@example.com",
      password: "password123",
    };

    const deleteId = "4323423423kkj";

    const { app, config } = getApplication("TESTING");
    await request(app).post("/register/voter").send(voter);
    const response = await request(app).delete(`/register/voter/${deleteId}`);
    expect(response.status).toBe(401);
  });

  it.todo("should delete the voter if the bearer token has admin role");

  it.todo("should return 404 if voter to delete does not exist");
});

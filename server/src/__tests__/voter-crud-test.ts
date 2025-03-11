import { beforeEach, describe, expect, it } from "@jest/globals";
import { type Voter } from "../models/registration-models";
import request from "supertest";
import getApplication from "../index";
import { clearDb } from "../repositories/mockdb";

const defaultCredentials = {
  email: "admin@admin.com",
  password: "admin",
};

describe("Voter CRUD tests", function () {
  beforeEach(() => {
    clearDb();
  });

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

  it("should send back 409 if duplicate voter", async function () {
    const voter1: Voter = {
      nic: "09887878899",
      fullname: "John Doe",
      dob: "1990-01-01",
      gender: "m",
      email: "johndoe@example.com",
      password: "1234password1234",
    };

    const voter2: Voter = {
      nic: "09887878899",
      fullname: "John Doe",
      dob: "1990-01-01",
      gender: "m",
      email: "johndoe@example.com",
      password: "1234password1234",
    };

    const { app, config } = getApplication("TESTING");
    await request(app).post("/register/voter").send(voter1);
    const response = await request(app).post("/register/voter").send(voter2);
    expect(response.status).toBe(409);
  });

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

  it("should delete the voter if the bearer token has admin role", async function () {
    const voter = {
      nic: "abn324234ssdaf",
      fullname: "John Doe",
      dob: "1990-01-01",
      gender: "m",
      email: "johndoe@example.com",
      password: "password123",
    };

    const deleteId = "abn324234ssdaf";

    const { app, config } = getApplication();
    config.logger?.debug(
      "Commencing test, model-crud-test.ts: should delete the voter if the bearer token has admin role",
    );
    await request(app).post("/register/voter").send(voter);
    const response = await request(app)
      .post("/auth/login")
      .send(defaultCredentials);
    const token = response.body.token;

    const deleteResponse = await request(app)
      .delete(`/register/voter/${deleteId}`)
      .set("authorization", `Bearer ${token}`);
    expect(deleteResponse.status).toBe(200);
  });

  it("should return 404 if voter to delete does not exist", async function () {
    const deleteId = "9101234123sdsxcvll111";

    const { app, config } = getApplication();
    config.logger?.debug(
      "Commencing test, model-crud-test.ts: should return 404 if voter to delete does not exist",
    );
    const response = await request(app)
      .post("/auth/login")
      .send(defaultCredentials);
    const token = response.body.token;

    const deleteResponse = await request(app)
      .delete(`/register/voter/${deleteId}`)
      .set("authorization", `Bearer ${token}`);
    expect(deleteResponse.status).toBe(404);
  });

  it("should return 201 when updating an existing voter", async function () {
    console.log(
      "Commencing test, model-crud-test: should return 201 when updating an existing voter",
    );

    const voter = {
      nic: "2afdasdfasdfasdfasdfasf",
      fullname: "John Doe",
      dob: "1990-01-01",
      gender: "m",
      email: "johndoe@example.com",
      password: "1234password1234",
    };

    const newFullName = "Gjohn Deer";

    const { app, config } = getApplication();
    await request(app).post("/register/voter").send(voter);
    const loginResponse = await request(app)
      .post("/auth/login")
      .send(defaultCredentials);
    const response = await request(app)
      .put("/register/voter")
      .set("authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        ...voter,
        fullname: newFullName,
      });

    expect(response.status).toBe(201);
  });

  it.todo("should return 401 when trying to update a voter without admin role");

  it.todo("should return 404 when trying to update a non-existing voter");

  it.todo(
    "should return 200 and return an array of voter objects in response to a get call",
  );

  it.todo("should return 404 when trying to fetch a non-existing voter");

  it.todo("should return 401 if a normal voter tries to delete another voter");
});

import getApplication from "../index";
import { describe, expect, it } from "@jest/globals";
import request from "supertest";

const defaultCredentials = {
  email: "admin@admin.com",
  password: "admin",
};

describe("Election CRUD tests", function () {
  it("should create an election", async () => {
    const election = {
      start_date: "2023-01-01",
      end_date: "2023-01-02",
      title: "Test Election",
    };

    const { app, config } = getApplication("TESTING");
    const loginResponse = await request(app)
      .post("/auth/login")
      .send(defaultCredentials);
    const response = await request(app)
      .post("/register/election")
      .set("authorization", `Bearer ${loginResponse.body.token}`)
      .send(election);

    expect(response.status).toBe(201);
  });
  it.todo("should retrieve an election");
  it.todo("should update an election");
  it.todo("should delete an election");
  it.todo("should retrieve all elections");
  it.todo("should retrieve the election given the date");
});

import mongoose from "mongoose";
import request from "supertest";
import * as matchers from "jest-extended";

import app from "../../app.js";
import User from "../../models/User.js";

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("test /api/users/login route", () => {
  let server = null;
  const registerData = {
    email: "anna@k.com",
    password: "123456",
    subscription: "pro",
  };
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);
    await request(app).post("/api/users/register").send(registerData);
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.connection.close();
    server.close();
  });

  test("test /api/users/login correctData", async () => {
    const loginData = {
      email: "anna@k.com",
      password: "123456",
    };

    const { body, statusCode } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    const userData = await User.findOne({ email: loginData.email });

    expect(statusCode).toBe(200);
    expect(loginData.email).toBe(body.user.email);
    expect(userData.email).toBe(loginData.email);
    expect(userData.token).toBe(body.token);
    expect(userData.subscription).toBe(body.user.subscription);
    expect(userData.email).toBe(body.user.email);
    expect(body).toBeObject();
    expect(body.user).toBeObject();
    expect(body).toContainKey("token");
    expect(body.user).toContainKeys(["email", "subscription"]);
    expect(body.user.email).toBeString();
    expect(body.user.subscription).toBeString();
  });
});

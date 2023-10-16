import axios from "axios";

import { UserResponse } from "@entities/User";
import { SchemaBody } from "@handlers/createUser/schema";
import { createTestUser, getFakeEmail } from "@testHelpers/fakes";

const baseUrl = process.env.apiBaseURL;

describe("createUser handler", () => {
  it("should respond with statusCode 200 to correct request", async () => {
    const payload: SchemaBody = {
      email: await getFakeEmail(),
      password: "fakepassword11@@",
      name: "fake name",
      avatarS3Key: null,
    };
    const actual = await axios.post<UserResponse>(`${baseUrl}`, payload);

    expect(actual.status).toBe(200);
  });

  it("should respond with created user", async () => {
    const email = await getFakeEmail();
    const payload: SchemaBody = {
      email: email,
      password: "fakepassword11@@",
      name: "fake name",
      avatarS3Key: null,
    };

    const response = await axios.post<UserResponse>(`${baseUrl}`, payload);
    const actual = response.data;

    expect(actual.id).toBeTruthy();
    expect(actual.email).toBe(email);
    expect(actual.name).toBe("fake name");
    expect(actual.avatarS3Key).toBe(null);
  });

  it("should respond with Bad Request 400 with an invalid email", async () => {
    const wrongPayload = {
      email: "invalid email",
      password: "fakepassword11@@",
      name: "fake name",
      avatarS3Key: null,
    };

    let actual;
    try {
      await axios.post(`${baseUrl}`, wrongPayload);
    } catch (e) {
      actual = e.response;
    }

    expect(actual.status).toBe(400);
    expect(actual.statusText).toBe("Bad Request");
  });

  it("should respond with Bad Request 400 with an empty name", async () => {
    const wrongPayload = {
      email: await getFakeEmail(),
      password: "fakepassword11@@",
      avatarS3Key: null,
    };

    let actual;
    try {
      await axios.post(`${baseUrl}`, wrongPayload);
    } catch (e) {
      actual = e.response;
    }

    expect(actual.status).toBe(400);
    expect(actual.statusText).toBe("Bad Request");
  });

  it("should respond with Bad Request 400 with an empty password", async () => {
    const wrongPayload = {
      email: await getFakeEmail(),
      name: "Obi-Wan",
      avatarS3Key: null,
    };

    let actual;
    try {
      await axios.post(`${baseUrl}`, wrongPayload);
    } catch (e) {
      actual = e.response;
    }

    expect(actual.status).toBe(400);
    expect(actual.statusText).toBe("Bad Request");
  });

  it("should respond with Conflict 409 for an existing email", async () => {
    const existingUser = await createTestUser();

    const payload: SchemaBody = {
      email: existingUser.email,
      name: "fake name",
      password: "fakepassword11@@",
      avatarS3Key: null,
    };

    let actual;
    try {
      await axios.post(`${baseUrl}`, payload);
    } catch (e) {
      actual = e.response;
    }
    expect(actual.status).toBe(409);
    expect(actual.statusText).toBe("Conflict");
    expect(actual.data.message).toBe(
      "A user with the provided email already exists.",
    );
  });
});

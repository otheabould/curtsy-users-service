import axios from "axios";

import { SchemaBody } from "@handlers/authenticateUser/schema";
import { createTestUser, fakepassword } from "@testHelpers/fakes";
import Response from "@handlers/authenticateUser/Response";

const baseUrl = process.env.apiBaseURL;

describe("authenticateUser handler", () => {
  it("should respond with statusCode 200 to correct request", async () => {
    const testUser = await createTestUser();
    const userID = testUser.id;

    const payload: SchemaBody = {
      password: testUser.password,
    };

    const actual = await axios.post<Response>(
      `${baseUrl}/${userID}/authenticate`,
      payload,
    );

    expect(actual.status).toBe(200);
  });

  it("should respond with success true for a valid id and password combination", async () => {
    const testUser = await createTestUser();
    const userID = testUser.id;

    const payload: SchemaBody = {
      password: fakepassword,
    };

    const response = await axios.post<Response>(
      `${baseUrl}/${userID}/authenticate`,
      payload,
    );
    const actual = response.data;

    expect(actual.success).toBe(true);
  });

  it("should respond with success false for an invalid password", async () => {
    const testUser = await createTestUser();
    const userID = testUser.id;

    const payload: SchemaBody = {
      password: "invalid password",
    };

    const response = await axios.post<Response>(
      `${baseUrl}/${userID}/authenticate`,
      payload,
    );
    const actual = response.data;

    expect(actual.success).toBe(false);
  });

  it("should respond with Not Found 404 for an invalid user id", async () => {
    const invalidID = "asfasdfasdfasd";

    const payload: SchemaBody = {
      password: "fakepassword@@",
    };

    let actual;
    try {
      await axios.post<Response>(
        `${baseUrl}/${invalidID}/authenticate`,
        payload,
      );
    } catch (e) {
      actual = e.response;
    }

    expect(actual.status).toBe(404);
    expect(actual.statusText).toBe("Not Found");
  });
});

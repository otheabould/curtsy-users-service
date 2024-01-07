import axios from "axios";

import { UserResponse } from "@entities/User";
import { SchemaBody } from "@handlers/updateUser/schema";
import { createTestUser } from "@testHelpers/fakes";

const baseUrl = process.env.apiBaseURL;

describe("updateUser handler", () => {
  it("should respond with statusCode 200 to correct request", async () => {
    const testUser = await createTestUser();
    const userID = testUser.id;

    const payload: SchemaBody = {
      password: "updated123@",
      name: "fake name - updated",
      avatarS3Key: "updated s3 key",
    };

    const actual = await axios.put<UserResponse>(
      `${baseUrl}/${userID}`,
      payload,
    );

    expect(actual.status).toBe(200);
  });

  it("should respond with updated user", async () => {
    const testUser = await createTestUser();
    const userID = testUser.id;

    const payload: SchemaBody = {
      password: "updated123@",
      name: "fake name - updated",
      avatarS3Key: "updated s3 key",
    };

    const response = await axios.put<UserResponse>(
      `${baseUrl}/${userID}`,
      payload,
    );
    const actual = response.data;

    expect(actual.id).toBe(userID);
    expect(actual.email).toBe(testUser.email);
    expect(actual.name).toBe("fake name - updated");
    expect(actual.avatarS3Key).toBe("updated s3 key");
  });

  it("should respond with Not Found 404 with an invalid user id", async () => {
    const userID = "invalidID";

    const payload: SchemaBody = {
      password: "updated123@",
      name: "fake name - updated",
      avatarS3Key: "updated s3 key",
    };

    let actual;
    try {
      await axios.put(`${baseUrl}/${userID}`, payload);
    } catch (e) {
      actual = e.response;
    }

    expect(actual.status).toBe(404);
    expect(actual.statusText).toBe("Not Found");
  });

  it("should respond with Bad Request 400 with an empty name", async () => {
    const userID = "randomID";
    const wrongPayload = {
      name: "",
      password: "fakepassword11@@",
      avatarS3Key: null,
    };

    let actual;
    try {
      await axios.put(`${baseUrl}/${userID}`, wrongPayload);
    } catch (e) {
      actual = e.response;
    }

    expect(actual.status).toBe(400);
    expect(actual.statusText).toBe("Bad Request");
  });

  it("should respond with Bad Request 400 with an empty password", async () => {
    const userID = "randomID";
    const wrongPayload = {
      password: "",
      name: "Obi-Wan",
      avatarS3Key: null,
    };

    let actual;
    try {
      await axios.put(`${baseUrl}/${userID}`, wrongPayload);
    } catch (e) {
      actual = e.response;
    }

    expect(actual.status).toBe(400);
    expect(actual.statusText).toBe("Bad Request");
  });

  it("should respond with Bad Request 400 with a week password", async () => {
    const userID = "randomID";
    const wrongPayload = {
      name: "Obi-Wan",
      password: "fakepassword@@",
      avatarS3Key: null,
    };

    let actual;
    try {
      await axios.put(`${baseUrl}/${userID}`, wrongPayload);
    } catch (e) {
      actual = e.response;
    }

    expect(actual.status).toBe(400);
    expect(actual.statusText).toBe("Bad Request");
  });
});

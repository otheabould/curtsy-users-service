import axios from "axios";

import { UserResponse } from "@entities/User";
import { createTestUser } from "@testHelpers/fakes";

const baseUrl = process.env.apiBaseURL;

describe("getUser handler", () => {
  it("should respond with statusCode 200 for a correct request", async () => {
    const user = await createTestUser();
    const actual = await axios.get<UserResponse>(`${baseUrl}/${user.id}`);

    expect(actual.status).toBe(200);
  });

  it("should respond with a userResponse for a correct request", async () => {
    const user = await createTestUser();
    const response = await axios.get<UserResponse>(`${baseUrl}/${user.id}`);

    const actual = response.data;
    expect(actual.id).toBe(user.id);
    expect(actual.email).toBe(user.email);
    expect(actual.avatarS3Key).toBe(user.avatarS3Key);
    expect(actual.name).toBe(user.name);
  });

  it("should respond with 404 error for an incorrect id", async () => {
    let actual;
    try {
      const fakeID = "sadfasdfasdf";
      await axios.get(`${baseUrl}/${fakeID}`);
    } catch (e) {
      actual = e.response;
    }

    expect(actual.status).toBe(404);
    expect(actual.statusText).toBe("Not Found");
  });
});

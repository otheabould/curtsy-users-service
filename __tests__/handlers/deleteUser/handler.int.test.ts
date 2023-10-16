import axios from "axios";

import { createTestUser } from "@testHelpers/fakes";
import DynamodbAdapter from "@utils/DynamodbAdapter";
import getUser from "@db/getUser";

const baseUrl = process.env.apiBaseURL;

describe("deleteUser handler", () => {
  it("should respond with statusCode 200 for a correct request", async () => {
    const user = await createTestUser();
    const actual = await axios.delete(`${baseUrl}/${user.id}`);

    expect(actual.status).toBe(200);
  });

  it("should successfully delete the user", async () => {
    const user = await createTestUser();
    await axios.delete(`${baseUrl}/${user.id}`);

    const db = new DynamodbAdapter(
      process.env.region,
      process.env.DYNAMODB_TABLE,
    );
    const dbUser = await getUser(db, user.id);

    expect(dbUser).toBe(undefined);
  });

  it("should respond with 404 error for an incorrect id", async () => {
    let actual;
    try {
      const fakeID = "sadfasdfasdf";
      await axios.delete(`${baseUrl}/${fakeID}`);
    } catch (e) {
      actual = e.response;
    }

    expect(actual.status).toBe(404);
    expect(actual.statusText).toBe("Not Found");
  });
});

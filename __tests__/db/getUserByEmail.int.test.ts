import DynamodbAdapter from "@utils/DynamodbAdapter";
import getUserByEmail from "@db/getUserByEmail";
import { createTestUser } from "@testHelpers/fakes";

describe("getUserByEmail", () => {
  it("should get a user by email", async () => {
    const db = new DynamodbAdapter(
      process.env.region,
      process.env.DYNAMODB_TABLE,
    );

    const user = await createTestUser();
    const actual = await getUserByEmail(db, user.email);

    expect(actual).toEqual(user);
  });
});

import DynamodbAdapter from "@utils/DynamodbAdapter";
import getUser from "@db/getUser";
import { createTestUser } from "@testHelpers/fakes";

describe("getUser", () => {
  it("should get a user", async () => {
    const db = new DynamodbAdapter(
      process.env.region,
      process.env.DYNAMODB_TABLE,
    );

    const user = await createTestUser();
    const actual = await getUser(db, user.id);

    expect(actual).toBeTruthy();
    expect(actual).toEqual(user);
  });
});

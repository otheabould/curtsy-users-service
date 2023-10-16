import DynamodbAdapter from "@utils/DynamodbAdapter";
import getUser from "@db/getUser";
import { createTestUser } from "@testHelpers/fakes";
import deleteUser from "@db/deleteUser";

describe("deleteUser", () => {
  it("should successfully delete a user", async () => {
    const db = new DynamodbAdapter(
      process.env.region,
      process.env.DYNAMODB_TABLE,
    );

    const user = await createTestUser();

    await deleteUser(db, user.id);
    const actual = await getUser(db, user.id);

    expect(actual).toEqual(undefined);
  });
});

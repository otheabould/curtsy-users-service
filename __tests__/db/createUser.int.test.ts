import { User } from "@entities/User";
import { generateID } from "@handlers/createUser/factory";
import DynamodbAdapter from "@utils/DynamodbAdapter";
import createUser from "@db/createUser";
import getUser from "@db/getUser";

describe("createUser", () => {
  it("should create a user", async () => {
    const db = new DynamodbAdapter(
      process.env.region,
      process.env.DYNAMODB_TABLE,
    );

    const now = Date.now();
    const id = generateID(now);

    const user: User = {
      id: id,
      createdAt: now,
      updatedAt: now,
      email: `${id}@testemail.com`,
      password: "FAKE",
      name: "Obi-Wan Kenobi",
      avatarS3Key: "fake-key",
    };

    const actual = await createUser(db, user);
    const itemStoredInDB = await getUser(db, id);

    expect(itemStoredInDB).toBeTruthy();
    expect(actual).toEqual(itemStoredInDB);
  });
});

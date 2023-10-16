import { User } from "@entities/User";
import { generateID } from "@handlers/createUser/factory";
import DynamodbAdapter from "@utils/DynamodbAdapter";
import createUser from "@db/createUser";
import KSUID from "ksuid";

export const createTestUser = async () => {
  const db = new DynamodbAdapter(
    process.env.region,
    process.env.DYNAMODB_TABLE,
  );

  const now = Date.now();
  const id = generateID(now);
  const email = await getFakeEmail();

  const user: User = {
    id: id,
    createdAt: now,
    updatedAt: now,
    email: email,
    password: "FAKE",
    name: "Obi-Wan Kenobi",
    avatarS3Key: "fake-key",
  };

  await createUser(db, user);
  return user;
};

export const getFakeEmail = async () => {
  const uuid = (await KSUID.random()).string.toLowerCase();
  return `${uuid}@test.com`;
};

export const getFakeID = async () => {
  const uuid = (await KSUID.random()).string.toLowerCase();
  return uuid;
};

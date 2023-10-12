import DynamodbAdapter from "@utils/DynamodbAdapter";
import { User } from "@entities/User";

const createUser = async (db: DynamodbAdapter, user: User): Promise<User> => {
  await db.create(user);
  return user;
};

export default createUser;

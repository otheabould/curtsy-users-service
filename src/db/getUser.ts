import DynamodbAdapter from "@utils/DynamodbAdapter";
import { User } from "@entities/User";

const getUser = async (db: DynamodbAdapter, id: string): Promise<User> => {
  const user = await db.get<User>({ id });
  return user;
};

export default getUser;

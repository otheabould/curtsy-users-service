import DynamodbAdapter from "@utils/DynamodbAdapter";
import { User } from "@entities/User";

const getUserByEmail = async (
  db: DynamodbAdapter,
  email: string,
): Promise<User> => {
  const gsiName = process.env.DYNAMODB_EMAIL_GSI;

  const user = (await db.queryIndexByField<User>(gsiName, "email", email))[0];
  return user;
};

export default getUserByEmail;

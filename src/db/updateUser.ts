import DynamodbAdapter from "@utils/DynamodbAdapter";
import { User } from "@entities/User";

export interface UpdateParams {
  password?: string;
  name?: string;
  avatarS3Key?: string | null;
  updatedAt: number;
}

const updateUser = async (
  db: DynamodbAdapter,
  id: string,
  params: UpdateParams,
): Promise<User> => {
  const user = await db.update<User>({ id }, params);
  return user;
};

export default updateUser;

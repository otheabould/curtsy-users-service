import DynamodbAdapter from "@utils/DynamodbAdapter";

const deleteUser = async (db: DynamodbAdapter, id: string): Promise<void> => {
  await db.delete({ id });
};

export default deleteUser;

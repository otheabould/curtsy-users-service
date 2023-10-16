import { User } from "@entities/User";
import { SchemaBody } from "./schema";
import { hashPassword } from "@utils/auth";
import { formatEmail, generateID } from "@utils/mapping";

export const newUser = (requestBody: SchemaBody): User => {
  const now = Date.now();

  const user: User = {
    id: generateID(now),
    createdAt: now,
    updatedAt: now,
    email: formatEmail(requestBody.email),
    password: hashPassword(requestBody.password),
    name: requestBody.name,
    avatarS3Key: requestBody.avatarS3Key || null,
  };

  return user;
};

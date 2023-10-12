import bcrypt from "bcryptjs";
import KSUID from "ksuid";
import crypto from "crypto";

import { User } from "@entities/User";
import { SchemaBody } from "./schema";

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

export const formatEmail = (email: string) => {
  const formattedEmail = email.trim().toLocaleLowerCase();
  return formattedEmail;
};

export const hashPassword = (plainPassword: string) => {
  const hash = bcrypt.hashSync(plainPassword, 9);
  return hash;
};

export const generateID = (createdAt: number) => {
  const payload = crypto.randomBytes(16);
  return KSUID.fromParts(createdAt, payload).string;
};

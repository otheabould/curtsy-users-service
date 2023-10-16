import KSUID from "ksuid";
import crypto from "crypto";

export const formatEmail = (email: string) => {
  const formattedEmail = email.trim().toLocaleLowerCase();
  return formattedEmail;
};

export const generateID = (createdAt: number) => {
  const payload = crypto.randomBytes(16);
  return KSUID.fromParts(createdAt, payload).string;
};

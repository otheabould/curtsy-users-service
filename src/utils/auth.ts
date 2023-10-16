import bcrypt from "bcryptjs";

export const hashPassword = (plainPassword: string) => {
  const hash = bcrypt.hashSync(plainPassword, 9);
  return hash;
};

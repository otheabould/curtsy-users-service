import bcrypt from "bcryptjs";

export const hashPassword = (plainPassword: string) => {
  const hash = bcrypt.hashSync(plainPassword, 9);
  return hash;
};

export const authenticatePassword = async (
  plainPassword: string,
  hash: string,
) => {
  const isValid = await bcrypt.compare(plainPassword, hash);
  return isValid;
};

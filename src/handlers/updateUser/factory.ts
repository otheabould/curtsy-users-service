import { hashPassword } from "@utils/auth";
import { SchemaBody } from "./schema";
import { UpdateParams } from "@db/updateUser";

export const newUpdateParams = (requestBody: SchemaBody): UpdateParams => {
  const updateParams: UpdateParams = {
    ...requestBody,
    updatedAt: new Date().getTime(),
  };

  if (requestBody.password) {
    updateParams.password = hashPassword(requestBody.password);
  }

  return updateParams;
};

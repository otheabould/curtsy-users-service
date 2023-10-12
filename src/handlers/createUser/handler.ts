import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import middyValidator from "@middy/validator";
import middyErrorHandler from "@middy/http-error-handler";
import { transpileSchema } from "@middy/validator/transpile";

import DynamodbAdapter from "@utils/DynamodbAdapter";
import { apiResponses, ValidatedHttpApiHandler } from "@utils/apiGateway";
import { newUserResponse } from "@entities/User";
import createUser from "@db/createUser";

import { schema, SchemaBody } from "./schema";
import { formatEmail, newUser } from "./factory";
import getUserByEmail from "@db/getUserByEmail";
import logger from "@utils/logger";

const log = logger(__filename);

const handler: ValidatedHttpApiHandler<SchemaBody> = async (event) => {
  try {
    const db = new DynamodbAdapter(
      process.env.region,
      process.env.DYNAMODB_TABLE,
    );

    const email = formatEmail(event.body.email);

    const existingUser = await getUserByEmail(db, email);
    if (existingUser) {
      return apiResponses._409(
        "A user with the provided email already exists.",
      );
    }

    const user = newUser(event.body);
    await createUser(db, user);

    const userResponse = newUserResponse(user);
    return apiResponses._200(userResponse);
  } catch (error) {
    log("Error creating user: ", { error });
    return apiResponses._500(error.message);
  }
};

export const main = middy(handler)
  .use(middyJsonBodyParser())
  .use(middyValidator({ eventSchema: transpileSchema(schema) }))
  .use(middyErrorHandler());

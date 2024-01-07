import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import middyValidator from "@middy/validator";
import middyErrorHandler from "@middy/http-error-handler";
import { transpileSchema } from "@middy/validator/transpile";

import DynamodbAdapter from "@utils/DynamodbAdapter";
import { apiResponses, ValidatedHttpApiHandler } from "@utils/apiGateway";

import { schema, SchemaBody } from "./schema";
import logger from "@utils/logger";
import getUser from "@db/getUser";
import { authenticatePassword } from "@utils/auth";
import Response from "./Response";

const log = logger(__filename);

const handler: ValidatedHttpApiHandler<SchemaBody> = async (event) => {
  try {
    const { id } = event.pathParameters;
    const { password } = event.body;

    const db = new DynamodbAdapter(
      process.env.region,
      process.env.DYNAMODB_TABLE,
    );

    const user = await getUser(db, id);
    if (!user) {
      return apiResponses._404("User not found.");
    }

    const success = await authenticatePassword(password, user.password);

    const response: Response = { success };
    return apiResponses._200(response);
  } catch (error) {
    log("Error : ", { error });
    return apiResponses._500(error.message);
  }
};

export const main = middy(handler)
  .use(middyJsonBodyParser())
  .use(middyValidator({ eventSchema: transpileSchema(schema) }))
  .use(middyErrorHandler());

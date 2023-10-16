import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import middyValidator from "@middy/validator";
import middyErrorHandler from "@middy/http-error-handler";
import { transpileSchema } from "@middy/validator/transpile";

import DynamodbAdapter from "@utils/DynamodbAdapter";
import { apiResponses, ValidatedHttpApiHandler } from "@utils/apiGateway";
import { newUserResponse } from "@entities/User";

import { schema } from "./schema";
import logger from "@utils/logger";
import getUser from "@db/getUser";

const log = logger(__filename);

const handler: ValidatedHttpApiHandler = async (event) => {
  try {
    const { id } = event.pathParameters;

    const db = new DynamodbAdapter(
      process.env.region,
      process.env.DYNAMODB_TABLE,
    );

    const user = await getUser(db, id);
    if (!user) {
      return apiResponses._404("User not found.");
    }

    const userResponse = newUserResponse(user);
    return apiResponses._200(userResponse);
  } catch (error) {
    log("Error: ", { error });
    return apiResponses._500(error.message);
  }
};

export const main = middy(handler)
  .use(middyJsonBodyParser())
  .use(middyValidator({ eventSchema: transpileSchema(schema) }))
  .use(middyErrorHandler());

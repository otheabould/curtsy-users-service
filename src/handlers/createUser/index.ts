import { handlerPath } from "@utils/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "POST",
        path: "/",
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["dynamodb:PutItem"],
      Resource: "${param:dynamodbArn}",
    },
    {
      Effect: "Allow",
      Action: ["dynamodb:Query"],
      Resource: "${param:dynamodbEmailGsiArn}",
    },
  ],
};

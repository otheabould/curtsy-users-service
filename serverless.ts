import type { AWS } from "@serverless/typescript";

import { createUser, getUser, deleteUser } from "@handlers/index";

const serverlessConfiguration: AWS = {
  service: "curtsy-users-service",
  frameworkVersion: "3",
  plugins: [
    "serverless-iam-roles-per-function",
    "serverless-esbuild",
    "serverless-export-env",
  ],

  provider: {
    name: "aws",
    stage: "${opt:stage, 'dev'}",
    runtime: "nodejs14.x",
    region: "eu-west-1",
    logRetentionInDays: 60,

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",

      DYNAMODB_TABLE: "${param:dynamodbTableName}",
      DYNAMODB_EMAIL_GSI: "${param:dynamodbEmailGSI}",

      // vars for tests
      stage: "${self:provider.stage}",
      region: "${self:provider.region}",
      service: "${self:service}",
      apiBaseURL: "${param:apiBaseURL}",
    },
  },
  // import the function via paths
  functions: { createUser, getUser, deleteUser },

  params: {
    default: {
      httpApiGatewayEndpointId: "${Ref HttpApi}",

      dynamodbTableName: "${self:service}-${self:provider.stage}",
      dynamodbEmailGSI: "emailIndex",

      dynamodbArn: {
        "Fn::Sub":
          "arn:aws:dynamodb:${self:provider.region}:${AWS::AccountId}:table/${param:dynamodbTableName}",
      },
      dynamodbEmailGsiArn: {
        "Fn::Join": [
          "",
          ["${param:dynamodbArn}", "/index/${param:dynamodbEmailGSI}"],
        ],
      },
      apiBaseURL: {
        "Fn::Join": [
          "",
          [
            "https://",
            {
              Ref: "HttpApi",
            },
            ".execute-api.${self:provider.region}.amazonaws.com",
          ],
        ],
      },
    },
  },

  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: false,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },

    "export-env": {
      filename: ".env.test",
      overwrite: true,
    },
  },

  package: {
    individually: true,
    patterns: [
      // include
      "src/**",
      // exclude
      "!*",
      "!__tests__/**",
      "!documentation/**",
      "!config/**",
      "!jestConfig/**",
    ],
  },

  resources: {
    Resources: {
      DynamoDb: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${param:dynamodbTableName}",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
            {
              AttributeName: "email",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          BillingMode: "PAY_PER_REQUEST",

          GlobalSecondaryIndexes: [
            {
              IndexName: "${param:dynamodbEmailGSI}",
              KeySchema: [
                {
                  AttributeName: "email",
                  KeyType: "HASH",
                },
              ],
              Projection: {
                ProjectionType: "ALL",
              },
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;

import type { FromSchema } from "json-schema-to-ts";

export const schema = {
  type: "object",
  properties: {
    pathParameters: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
    body: {
      type: "object",
      properties: {
        password: {
          type: "string",
          description: "The user's password.",
          pattern: "^(?=.*?[a-zA-Z])(?=.*?[0-9]).{10,}$",
        },
        name: {
          type: "string",
          description: "The user's name.",
          minLength: 1,
        },
        avatarS3Key: {
          type: "string",
          description: "The user's avatar s3Key",
        },
      },
      required: [],
      additionalProperties: false,
    },
  },
  required: ["pathParameters", "body"],
} as const;

export type SchemaBody = FromSchema<typeof schema.properties.body>;

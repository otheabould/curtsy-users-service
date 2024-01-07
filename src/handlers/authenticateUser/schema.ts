import type { FromSchema } from "json-schema-to-ts";

export const schema = {
  type: "object",
  properties: {
    pathParameters: {
      type: "object",
      properties: {
        id: { type: "string" },
        additionalProperties: false,
      },
      required: ["id"],
    },
    body: {
      type: "object",
      properties: {
        password: {
          type: "string",
          description: "The user's password.",
          minLength: 1,
        },
      },
      required: ["password"],
      additionalProperties: false,
    },
  },
  required: ["pathParameters", "body"],
} as const;

export type SchemaBody = FromSchema<typeof schema.properties.body>;

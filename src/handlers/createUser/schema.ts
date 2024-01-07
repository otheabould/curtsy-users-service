import { strongPasswordRegex } from "@utils/regexp";
import type { FromSchema } from "json-schema-to-ts";

export const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "The user's email.",
          format: "email",
        },
        password: {
          type: "string",
          description: "The user's password.",
          pattern: strongPasswordRegex,
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
      required: ["email", "password", "name"],
      additionalProperties: false,
    },
  },
  required: ["body"],
} as const;

export type SchemaBody = FromSchema<typeof schema.properties.body>;

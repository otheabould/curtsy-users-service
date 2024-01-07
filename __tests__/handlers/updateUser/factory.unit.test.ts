import { newUpdateParams } from "@handlers/updateUser/factory";
import { SchemaBody } from "@handlers/updateUser/schema";

describe("factory", () => {
  describe("newUpdateParams", () => {
    it("should map the existing fields", () => {
      const userRequest: SchemaBody = {
        password: "fake password",
        name: "fake name",
        avatarS3Key: null,
      };

      const params = newUpdateParams(userRequest);

      expect(params.password.length).toBeGreaterThan(0);
      expect(params.name).toBe("fake name");
      expect(params.avatarS3Key).toBe(null);
    });

    it("should correctly hash the password", () => {
      const userRequest: SchemaBody = {
        password: "fake password",
        name: "fake name",
        avatarS3Key: null,
      };

      const params = newUpdateParams(userRequest);

      expect(params.password.length).toBeGreaterThanOrEqual(1);
      expect(params.password).not.toBe(userRequest.password);
    });

    it("should set the correct updatedAt timestamp", () => {
      const userRequest: SchemaBody = {
        password: "fake password",
        name: "fake name",
        avatarS3Key: null,
      };

      const params = newUpdateParams(userRequest);
      const now = Date.now();

      expect(params.updatedAt).toBeLessThanOrEqual(now);
      expect(params.updatedAt).toBeGreaterThanOrEqual(now - 100);
      expect(params.updatedAt).toBeLessThanOrEqual(now);
      expect(params.updatedAt).toBeGreaterThanOrEqual(now - 100);
    });
  });
});

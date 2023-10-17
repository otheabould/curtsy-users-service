import { newUser } from "@handlers/createUser/factory";
import { SchemaBody } from "@handlers/createUser/schema";

describe("factory", () => {
  describe("newUser", () => {
    it("should map the existing fields", () => {
      const userRequest: SchemaBody = {
        email: "fake@test.com",
        password: "fake password",
        name: "fake name",
        avatarS3Key: null,
      };

      const user = newUser(userRequest);

      expect(user.email).toBe("fake@test.com");
      expect(user.password.length).toBeGreaterThan(0);
      expect(user.name).toBe("fake name");
      expect(user.avatarS3Key).toBe(null);
    });

    it("should correctly generate the id", () => {
      const userRequest: SchemaBody = {
        email: "fake@test.com",
        password: "fake password",
        name: "fake name",
        avatarS3Key: null,
      };
      const user = newUser(userRequest);
      expect(user.id.length).toBeGreaterThan(0);
    });

    it("should set the correct createdAt and updatedAt timestamp", () => {
      const userRequest: SchemaBody = {
        email: "fake@test.com",
        password: "fake password",
        name: "fake name",
        avatarS3Key: null,
      };

      const user = newUser(userRequest);
      const now = Date.now();

      expect(user.createdAt).toBeLessThanOrEqual(now);
      expect(user.createdAt).toBeGreaterThanOrEqual(now - 100);
      expect(user.updatedAt).toBeLessThanOrEqual(now);
      expect(user.updatedAt).toBeGreaterThanOrEqual(now - 100);
    });
  });
});

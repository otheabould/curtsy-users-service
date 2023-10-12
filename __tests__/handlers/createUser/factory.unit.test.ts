import {
  generateID,
  hashPassword,
  newUser,
} from "@handlers/createUser/factory";
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
      console.log(`user.createdAt: ${user.createdAt} now: ${now}`);
      expect(user.createdAt).toBeLessThanOrEqual(now);
      expect(user.createdAt).toBeGreaterThanOrEqual(now - 100);
      expect(user.updatedAt).toBeLessThanOrEqual(now);
      expect(user.updatedAt).toBeGreaterThanOrEqual(now - 100);
    });
  });

  describe("generateID", () => {
    it("should return a new id", () => {
      const now = Date.now();
      const actual = generateID(now);

      expect(actual.length).toBeGreaterThan(0);
    });

    it("should generate a random ID", () => {
      const now = Date.now();
      const id1 = generateID(now);
      const id2 = generateID(now);

      expect(id1).not.toEqual(id2);
    });
  });

  describe("hashPassword", () => {
    it("should return a new hashed password", () => {
      const password = "fake password";
      const actual = hashPassword(password);

      expect(actual.length).toBeGreaterThan(0);
    });

    it("should return a random hash", () => {
      const password = "fake password";

      const hash1 = hashPassword(password);
      const hash2 = hashPassword(password);

      expect(hash1).not.toEqual(hash2);
    });
  });
});

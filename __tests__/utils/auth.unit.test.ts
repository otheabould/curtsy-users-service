import { hashPassword } from "@utils/auth";

describe("auth", () => {
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

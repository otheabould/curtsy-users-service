import { User, newUserResponse } from "@entities/User";

describe("User", () => {
  describe("newUserResponse", () => {
    it("should map the correct fields", () => {
      const user: User = {
        id: "FAKE",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        email: "fake@email.com",
        name: "tester",
        password: "fakepassword",
        avatarS3Key: null,
      };

      const actual = newUserResponse(user);

      expect(actual.id).toBe("FAKE");
      expect(actual.email).toBe("fake@email.com");
      expect(actual.name).toBe("tester");
      expect(actual.avatarS3Key).toBe(null);
    });

    it("should create a new instance", () => {
      const user: User = {
        id: "FAKE",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        email: "fake@email.com",
        name: "tester",
        password: "fakepassword",
        avatarS3Key: null,
      };

      const actual = newUserResponse(user);
      expect(actual).not.toBe(user);
    });
  });
});

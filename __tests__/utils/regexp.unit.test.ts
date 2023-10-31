import { strongPasswordRegex } from "@utils/regexp";

describe("regexp", () => {
  describe("strongPasswordRegex", () => {
    it("should pass if a password contains letters, numbers and is at least 10 characters", () => {
      const password = "password123";

      const actual = strongPasswordRegex.test(password);
      const expected = true;

      expect(actual).toBe(expected);
    });

    it("should fail if the password is shorter than 10 characters", () => {
      const password = "password1";

      const actual = strongPasswordRegex.test(password);
      const expected = false;

      expect(actual).toBe(expected);
    });

    it("should fail if the password does not contain letters", () => {
      const password = "1234567890";

      const actual = strongPasswordRegex.test(password);
      const expected = false;

      expect(actual).toBe(expected);
    });

    it("should fail if the password does not contain numbers", () => {
      const password = "passwordpassword";

      const actual = strongPasswordRegex.test(password);
      const expected = false;

      expect(actual).toBe(expected);
    });
  });
});

import { strongPasswordRegex } from "@utils/regexp";

describe("regexp", () => {
  describe("strongPasswordRegex", () => {
    it("should pass if a password contains letters, numbers and is at least 10 characters", () => {
      const password = "password123";
      const regexp = new RegExp(strongPasswordRegex);

      const actual = regexp.test(password);
      const expected = true;

      expect(actual).toBe(expected);
    });

    it("should fail if the password is shorter than 10 characters", () => {
      const password = "password1";
      const regexp = new RegExp(strongPasswordRegex);

      const actual = regexp.test(password);
      const expected = false;

      expect(actual).toBe(expected);
    });

    it("should fail if the password does not contain letters", () => {
      const password = "1234567890";
      const regexp = new RegExp(strongPasswordRegex);

      const actual = regexp.test(password);
      const expected = false;

      expect(actual).toBe(expected);
    });

    it("should fail if the password does not contain numbers", () => {
      const password = "passwordpassword";
      const regexp = new RegExp(strongPasswordRegex);

      const actual = regexp.test(password);
      const expected = false;

      expect(actual).toBe(expected);
    });
  });
});

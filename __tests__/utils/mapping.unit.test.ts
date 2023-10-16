import { generateID } from "@utils/mapping";

describe("mapping", () => {
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
});

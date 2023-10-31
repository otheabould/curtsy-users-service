import DynamodbAdapter from "@utils/DynamodbAdapter";

describe("DynamoDB Adapter", () => {
  describe("_generateUpdateExpression", () => {
    it("should add property names to the expression", async () => {
      const db = new DynamodbAdapter("fake-region", "fake-table");

      const payload = {
        name: "fake name",
        email: "fake@email.com",
      };

      const expressionResult = db._generateUpdateExpression(payload);

      const actual = expressionResult.UpdateExpression;
      const expected = "SET  #name = :name, #email = :email";
      expect(actual).toBe(expected);
    });

    it("should return an ExpressionAttributeNames record including the provided propery names", async () => {
      const db = new DynamodbAdapter("fake-region", "fake-table");

      const payload = {
        name: "fake name",
        email: "fake@email.com",
      };

      const expressionResult = db._generateUpdateExpression(payload);

      const actual = expressionResult.ExpressionAttributeNames;
      const expected = {
        "#name": "name",
        "#email": "email",
      };

      expect(actual).toEqual(expected);
    });

    it("should return an ExpressionAttributeValues record including the provided propery names and values", async () => {
      const db = new DynamodbAdapter("fake-region", "fake-table");

      const payload = {
        name: "fake name",
        email: "fake@email.com",
      };

      const expressionResult = db._generateUpdateExpression(payload);

      const actual = expressionResult.ExpressionAttributeValues;
      const expected = {
        ":name": "fake name",
        ":email": "fake@email.com",
      };

      expect(actual).toEqual(expected);
    });
  });
});

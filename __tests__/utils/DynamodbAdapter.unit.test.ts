import DynamodbAdapter from "@utils/DynamodbAdapter";

describe("DynamoDB Adapter", () => {
  describe("_generateUpdateExpression", () => {
    it("should add property names to the update expression", async () => {
      const db = new DynamodbAdapter("fake-region", "fake-table");

      const key = {
        id: "fakeID",
      };
      const payload = {
        name: "fake name",
        email: "fake@email.com",
      };

      const expressionResult = db._generateUpdateExpression(key, payload);

      const actual = expressionResult.UpdateExpression;
      const expected = "SET #name = :name, #email = :email";
      expect(actual).toBe(expected);
    });

    it("should add property names to the condition expression", async () => {
      const db = new DynamodbAdapter("fake-region", "fake-table");

      const key = {
        id: "fakeID",
        sort: "sortKey",
      };
      const payload = {
        name: "fake name",
        email: "fake@email.com",
      };

      const expressionResult = db._generateUpdateExpression(key, payload);

      const actual = expressionResult.ConditionExpression;
      const expected = "#id = :id AND #sort = :sort";
      expect(actual).toBe(expected);
    });

    it("should return an ExpressionAttributeNames record including the provided propery names", async () => {
      const db = new DynamodbAdapter("fake-region", "fake-table");

      const key = {
        id: "fakeID",
      };
      const payload = {
        name: "fake name",
        email: "fake@email.com",
      };

      const expressionResult = db._generateUpdateExpression(key, payload);

      const actual = expressionResult.ExpressionAttributeNames;
      const expected = {
        "#id": "id",
        "#name": "name",
        "#email": "email",
      };

      expect(actual).toEqual(expected);
    });

    it("should return an ExpressionAttributeValues record including the provided propery names and values", async () => {
      const db = new DynamodbAdapter("fake-region", "fake-table");

      const key = {
        id: "fakeID",
      };
      const payload = {
        name: "fake name",
        email: "fake@email.com",
      };

      const expressionResult = db._generateUpdateExpression(key, payload);

      const actual = expressionResult.ExpressionAttributeValues;
      const expected = {
        ":id": "fakeID",
        ":name": "fake name",
        ":email": "fake@email.com",
      };

      expect(actual).toEqual(expected);
    });
  });
});

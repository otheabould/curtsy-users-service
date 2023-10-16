import { getFakeID } from "@testHelpers/fakes";
import DynamodbAdapter from "@utils/DynamodbAdapter";

const region = process.env.region;
const tableName = process.env.DYNAMODB_TABLE;

describe("DynamoDB Adapter", () => {
  describe("queryByField", () => {
    it("should return an empty array if no items are found", async () => {
      const db = new DynamodbAdapter(region, tableName);
      const actual = await db.queryByField("id", "fake-fake-fake");
      expect(actual).toEqual([]);
    });

    it("should return the matching items", async () => {
      const db = new DynamodbAdapter(region, tableName);

      const item1 = {
        id: await getFakeID(),
        type: "test",
      };
      const item2 = {
        id: await getFakeID(),
        type: "test 2",
      };

      await db.create(item1);
      await db.create(item2);

      const actual = await db.queryByField("id", item1.id);
      const expected = [item1];

      expect(actual).toEqual(expected);
    });
  });

  describe("query", () => {
    it("should return an empty array if no items are found", async () => {
      const db = new DynamodbAdapter(region, tableName);

      const condition = "#id = :id";
      const attributeNames = { "#id": "id" };
      const attributevalues = { ":id": "random id" };

      const actual = await db.query(condition, attributeNames, attributevalues);

      expect(actual).toEqual([]);
    });

    it("should return the matching items", async () => {
      const db = new DynamodbAdapter(region, tableName);

      const item1 = {
        id: await getFakeID(),
        type: "test",
      };
      const item2 = {
        id: await getFakeID(),
        type: "test 2",
      };

      await db.create(item1);
      await db.create(item2);

      const condition = "#id = :id";
      const attributeNames = { "#id": "id" };
      const attributevalues = { ":id": item1.id };

      const actual = await db.query(condition, attributeNames, attributevalues);

      const expected = [item1];

      expect(actual).toEqual(expected);
    });
  });

  describe("get & create", () => {
    it("should get and create an item", async () => {
      const db = new DynamodbAdapter(region, tableName);

      const id = await getFakeID();

      const paramsCreate = {
        id,
        Type: "SampleId",
      };
      await db.create(paramsCreate);

      const actual = await db.get({ id });

      expect(actual).toEqual(paramsCreate);
    });
  });

  describe("delete", () => {
    it("should delete an item by it's primary key", async () => {
      const db = new DynamodbAdapter(region, tableName);

      const id = await getFakeID();

      const paramsCreate = {
        id,
        Type: "SampleId",
      };
      await db.create(paramsCreate);
      await db.delete({ id });

      const queryResult = await db.queryByField("id", id);
      expect(queryResult).toEqual([]);
    });
  });
});

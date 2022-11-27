import {PaginateOutput } from "../../domain";
import { PaginateTransformer }  from "./paginate.transformer";

describe("PaginateTransformer Unit Tests", () => {
  it("should convert a SearchResult in output", () => {
    const result = new PaginateOutput({
      collection: ["fake"] as any[],
      total: 1,
      currentPage: 1,
      perPage: 1,
      orderBy: {field: 'a', direction: 'asc'},
      filter: "fake"
    });
    const output = PaginateTransformer.toOutput(result.collection, result);

    expect(output).toStrictEqual({
      collection: ['fake'],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
    });
  });
});

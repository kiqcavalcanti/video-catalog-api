import { CategoryTransformer } from "./index";
import { Category } from "../../domain";

describe("CategoryTransformer Unit Tests", () => {
  it("should convert a category in output", () => {
    const createdAt = new Date();
    const entity = new Category({
      name: "Movie",
      description: "some description",
      isActive: true,
      createdAt,
    });
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = CategoryTransformer.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
        id: entity.id,
        name: "Movie",
        description: "some description",
        isActive: true,
        createdAt,
    })
  });
});

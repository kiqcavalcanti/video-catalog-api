import { Category } from "../../domain";
import { CategoryOutputDto } from "../dto";

export class CategoryTransformer {
    static toOutput(entity: Category): CategoryOutputDto {
        return entity.toJSON();
    }
}

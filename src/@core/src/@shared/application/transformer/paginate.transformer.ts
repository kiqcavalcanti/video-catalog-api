import { PaginateOutput } from "../../domain";
import { PaginationOutputDto } from "../dto";

export class PaginateTransformer {
    static toOutput<Item>(
        collection: Item[],
        result: PaginateOutput
    ): PaginationOutputDto<Item> {
        return {
            collection,
            total: result.total,
            currentPage: result.currentPage,
            lastPage: result.lastPage,
            perPage: result.perPage,
        };
    }
}
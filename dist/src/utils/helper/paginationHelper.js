"use strict";
// utils/helper/paginationHelper.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
/**
 * Utility to handle pagination logic
 * @param count - Total count of records
 * @param rows - The data rows for the current page
 * @param paginationOptions - Pagination options: page and limit
 * @returns Paginated response with metadata and data
 */
function paginate(count, rows, paginationOptions) {
    const { page, limit } = paginationOptions;
    return {
        data: rows,
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
    };
}
//# sourceMappingURL=paginationHelper.js.map
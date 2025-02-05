// utils/helper/paginationHelper.ts

export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface IPaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: T[];
}

/**
 * Utility to handle pagination logic
 * @param count - Total count of records
 * @param rows - The data rows for the current page
 * @param paginationOptions - Pagination options: page and limit
 * @returns Paginated response with metadata and data
 */
export function paginate<T>(count: number, rows: T[], paginationOptions: IPaginationOptions): IPaginatedResponse<T> {
  const { page, limit } = paginationOptions;

  return {
    data: rows,
    total: count,
    page,
    limit,
    totalPages: Math.ceil(count / limit)
  };
}

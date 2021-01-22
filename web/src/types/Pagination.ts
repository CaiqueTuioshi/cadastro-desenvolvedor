export interface PagedResponse<T> {
  content: T[];
  totalPages: number;
  currentPage: number;
  first: boolean;
  last: boolean;
};

export interface PageRequest {
  page: number;
  limit: number;
};
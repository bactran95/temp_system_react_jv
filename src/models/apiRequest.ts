export interface QueryParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
}

export interface ErrorResponse {
  response: {
    data: {
      code: string;
      message: string;
    };
  };
}

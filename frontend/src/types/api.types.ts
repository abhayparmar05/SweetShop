export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface SearchResponse<T> {
    success: boolean;
    data: T[];
    count: number;
}

export interface ApiError {
    success: false;
    message: string;
    errors?: Array<{
        field: string;
        message: string;
    }>;
}

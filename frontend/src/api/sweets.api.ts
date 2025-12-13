import axiosInstance from './axios';
import type {
    Sweet,
    CreateSweetData,
    UpdateSweetData,
    PurchaseData,
    RestockData,
    SearchParams,
    PurchaseResponse,
    RestockResponse,
} from '../types/sweet.types';
import type { PaginatedResponse, SearchResponse, ApiResponse } from '../types/api.types';

export const sweetsApi = {
    // Get all sweets with pagination
    getAllSweets: async (page: number = 1, limit: number = 12): Promise<PaginatedResponse<Sweet>> => {
        const response = await axiosInstance.get<PaginatedResponse<Sweet>>(
            `/sweets?page=${page}&limit=${limit}`
        );
        return response.data;
    },

    // Search sweets by name, category, or price range
    searchSweets: async (params: SearchParams): Promise<SearchResponse<Sweet>> => {
        const queryParams = new URLSearchParams();
        if (params.name) queryParams.append('name', params.name);
        if (params.category) queryParams.append('category', params.category);
        if (params.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
        if (params.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());

        const response = await axiosInstance.get<SearchResponse<Sweet>>(
            `/sweets/search?${queryParams.toString()}`
        );
        return response.data;
    },

    // Create a new sweet (Admin)
    createSweet: async (data: CreateSweetData): Promise<ApiResponse<Sweet>> => {
        const response = await axiosInstance.post<ApiResponse<Sweet>>('/sweets', data);
        return response.data;
    },

    // Update a sweet (Admin)
    updateSweet: async (id: string, data: UpdateSweetData): Promise<ApiResponse<Sweet>> => {
        const response = await axiosInstance.put<ApiResponse<Sweet>>(`/sweets/${id}`, data);
        return response.data;
    },

    // Delete a sweet (Admin only)
    deleteSweet: async (id: string): Promise<ApiResponse<void>> => {
        const response = await axiosInstance.delete<ApiResponse<void>>(`/sweets/${id}`);
        return response.data;
    },

    // Purchase a sweet
    purchaseSweet: async (id: string, data: PurchaseData): Promise<PurchaseResponse> => {
        const response = await axiosInstance.post<PurchaseResponse>(`/sweets/${id}/purchase`, data);
        return response.data;
    },

    // Restock a sweet (Admin only)
    restockSweet: async (id: string, data: RestockData): Promise<RestockResponse> => {
        const response = await axiosInstance.post<RestockResponse>(`/sweets/${id}/restock`, data);
        return response.data;
    },

    // Get sweet statistics
    getSweetStats: async (): Promise<ApiResponse<{ total: number; inStock: number; outOfStock: number }>> => {
        const response = await axiosInstance.get<ApiResponse<{ total: number; inStock: number; outOfStock: number }>>('/sweets/stats');
        return response.data;
    },
};

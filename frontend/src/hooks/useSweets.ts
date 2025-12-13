import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sweetsApi } from '../api/sweets.api';
import type {
    CreateSweetData,
    UpdateSweetData,
    PurchaseData,
    RestockData,
    SearchParams,
} from '../types/sweet.types';
import toast from 'react-hot-toast';

export const useSweets = (page: number = 1, limit: number = 12) => {
    return useQuery({
        queryKey: ['sweets', page, limit],
        queryFn: () => sweetsApi.getAllSweets(page, limit),
    });
};

export const useSearchSweets = (params: SearchParams) => {
    return useQuery({
        queryKey: ['sweets', 'search', params],
        queryFn: () => sweetsApi.searchSweets(params),
        enabled: Object.keys(params).length > 0,
    });
};

export const useCreateSweet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateSweetData) => sweetsApi.createSweet(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['sweets'] });
            queryClient.invalidateQueries({ queryKey: ['sweets', 'stats'] });
            toast.success(data.message || 'Sweet created successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to create sweet';
            toast.error(message);
        },
    });
};

export const useUpdateSweet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateSweetData }) =>
            sweetsApi.updateSweet(id, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['sweets'] });
            queryClient.invalidateQueries({ queryKey: ['sweets', 'stats'] });
            toast.success(data.message || 'Sweet updated successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to update sweet';
            toast.error(message);
        },
    });
};

export const useDeleteSweet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => sweetsApi.deleteSweet(id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['sweets'] });
            queryClient.invalidateQueries({ queryKey: ['sweets', 'stats'] });
            toast.success(data.message || 'Sweet deleted successfully!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to delete sweet';
            toast.error(message);
        },
    });
};

export const usePurchaseSweet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: PurchaseData }) =>
            sweetsApi.purchaseSweet(id, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['sweets'] });
            queryClient.invalidateQueries({ queryKey: ['sweets', 'stats'] });
            toast.success(data.message || 'Purchase successful!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Purchase failed';
            toast.error(message);
        },
    });
};

export const useRestockSweet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: RestockData }) =>
            sweetsApi.restockSweet(id, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['sweets'] });
            queryClient.invalidateQueries({ queryKey: ['sweets', 'stats'] });
            toast.success(data.message || 'Restock successful!');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Restock failed';
            toast.error(message);
        },
    });
};

export const useSweetStats = () => {
    return useQuery({
        queryKey: ['sweets', 'stats'],
        queryFn: () => sweetsApi.getSweetStats(),
    });
};


import apiClient from './axios';
import type { User } from '../types/user.types';

export interface GetUsersResponse {
    success: boolean;
    data: User[];
    total: number;
}

export interface UpdateUserData {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: 'user' | 'admin';
}

export interface DeleteUserResponse {
    success: boolean;
    message: string;
}

// Get all users (admin only)
export const getAllUsers = async (): Promise<GetUsersResponse> => {
    const response = await apiClient.get('/users');
    return response.data;
};

// Update user (admin only)
export const updateUser = async (userId: string, data: UpdateUserData): Promise<{ success: boolean; data: User }> => {
    const response = await apiClient.put(`/users/${userId}`, data);
    return response.data;
};

// Delete user (admin only)
export const deleteUser = async (userId: string): Promise<DeleteUserResponse> => {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
};

import axiosInstance from './axios';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/user.types';

export const authApi = {
    // Register a new user
    register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/auth/register', credentials);
        return response.data;
    },

    // Login user
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    // Logout user
    logout: async (): Promise<void> => {
        await axiosInstance.post('/auth/logout');
    },

    // Refresh access token
    refresh: async (): Promise<void> => {
        await axiosInstance.post('/auth/refresh');
    },
};

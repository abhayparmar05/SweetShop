import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth.api';
import type { LoginCredentials, RegisterCredentials } from '../types/user.types';
import { useAppDispatch } from './useRedux';
import { setUser, logout as logoutAction } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
        onSuccess: (data) => {
            // Only store user data, tokens are in cookies
            dispatch(setUser({ user: data.data.user }));
            toast.success(data.message || 'Login successful!');
            navigate('/dashboard');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(message);
        },
    });

    // Register mutation
    const registerMutation = useMutation({
        mutationFn: (credentials: RegisterCredentials) => authApi.register(credentials),
        onSuccess: (data) => {
            // Only store user data, tokens are in cookies
            dispatch(setUser({ user: data.data.user }));
            toast.success(data.message || 'Registration successful!');
            navigate('/dashboard');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(message);
        },
    });

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            dispatch(logoutAction());
            toast.success('Logged out successfully');
            navigate('/home');
        },
        onError: () => {
            // Even if API call fails, clear local state
            dispatch(logoutAction());
            navigate('/home');
        },
    });

    return {
        login: loginMutation.mutate,
        register: registerMutation.mutate,
        logout: () => logoutMutation.mutate(),
        isLoginLoading: loginMutation.isPending,
        isRegisterLoading: registerMutation.isPending,
        isLogoutLoading: logoutMutation.isPending,
    };
};

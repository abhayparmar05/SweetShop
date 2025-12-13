import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../../types/user.types';


const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: null, // Token is now in cookies
    isAuthenticated: !!localStorage.getItem('user'), // Check if user exists
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
            state.token = null; // Token is in cookies, not in state
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

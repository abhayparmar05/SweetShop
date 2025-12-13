import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '../store';

/**
 * Typed version of the useDispatch hook for Redux
 * @returns Typed dispatch function for the app's Redux store
 * @example
 * const dispatch = useAppDispatch();
 * dispatch(setUser({ user: userData }));
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed version of the useSelector hook for Redux
 * Provides type safety when selecting from the Redux store
 * @example
 * const user = useAppSelector((state) => state.auth.user);
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

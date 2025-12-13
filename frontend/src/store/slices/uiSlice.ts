import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


interface UIState {
    isLoading: boolean;
    modalOpen: string | null;
}

const initialState: UIState = {
    isLoading: false,
    modalOpen: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        openModal: (state, action: PayloadAction<string>) => {
            state.modalOpen = action.payload;
        },
        closeModal: (state) => {
            state.modalOpen = null;
        },
    },
});

export const { setLoading, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    isOpen: boolean,
    todoId: string
}

const initialState: IInitialState = {
    isOpen: false,
    todoId: ''
}

const modalSlice = createSlice({
    name: '@@modal',
    initialState,
    reducers: {
        openModal: (state, action:PayloadAction<string>) => {
            state.isOpen = true;
            state.todoId = action.payload;
        },
        closeModal: () => {
            return initialState
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
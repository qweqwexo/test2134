import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    searchedValue: string
}

const initialState: IInitialState = {
    searchedValue: ''
}

const filterSlice = createSlice({
    name: '@@filter',
    initialState,
    reducers: {
        setSearchedValue: (state, action: PayloadAction<string>) => {
            state.searchedValue = action.payload;
        }
    }
})

export const { setSearchedValue } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
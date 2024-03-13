import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./todos/todos-slice";
import { filterReducer } from "./filter/filter-slice";

export const store = configureStore({
    reducer: {
        todosReducer,
        filter: filterReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
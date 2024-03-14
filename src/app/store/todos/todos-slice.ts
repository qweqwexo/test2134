import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ITodo } from "@/app/types/types";

export const getAllTodos = createAsyncThunk<ITodo[], void>(
    '@@getAllTodos',
    async () => {
        const res = await fetch(`${process.env.BACKEND_URL}/`);
        const data = await res.json();
        return data;
    }
)

export const postNewTodo = createAsyncThunk<ITodo, ITodo>(
    '@@postNewTodo',
    async ({id, title, desc, completed}) => {
        await fetch(`${process.env.BACKEND_URL}/`, {
            method: 'POST',
            headers: {
                'Content-type':'Application/json'
            },
            body: JSON.stringify({id, title, desc, completed})
        });
        return {id, title, desc, completed}
    }
)
export const deleteTodo = createAsyncThunk<string, string>(
    '@@deleteTodo',
    async (id) => {
        await fetch(`${process.env.BACKEND_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type':'Application/json'
            }
        });
        return id
    }
)

interface IToggleTodo {
    id: string,
    completed: boolean
}
export const toggleTodo = createAsyncThunk<string, IToggleTodo>(
    '@@toggleTodo',
    async ({id, completed}) => {
        await fetch(`${process.env.BACKEND_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type':'Application/json'
            },
            body: JSON.stringify({completed: !completed})
        });
        return id
    }
)


export const changeTodo = createAsyncThunk<Partial<ITodo>, Partial<ITodo>>(
    '@@changeTodo',
    async ({id, title, desc, completed}) => {
        await fetch(`${process.env.BACKEND_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type':'Application/json'
            },
            body: JSON.stringify({title, desc, completed})
        });
        return {id, title, desc, completed};
    }
)

interface IInitialState {
    todos: ITodo[],
    status: string,
    error: boolean
}

const initialState: IInitialState = {
    todos: [],
    status: 'idle',
    error: false
}

const todosSlice = createSlice({
    name: '@@todos',
    initialState,
    reducers: {
        resetTodos: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTodos.rejected, (state) => {
                state.error = true;
                state.status = 'rejected';
            })
            .addCase(getAllTodos.pending, (state) => {
                state.error = false;
                state.status = 'loading';
            })
            .addCase(getAllTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.error = false;
                state.status = 'loaded';
            })
            .addCase(postNewTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload)
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(t => t.id !== action.payload)
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex(t => t.id === action.payload)
                state.todos[index].completed = !state.todos[index].completed
            })
            .addCase(changeTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex(t => t.id === action.payload.id);
                state.todos[index] = action.payload as ITodo;
            })
    }
})

export const { resetTodos } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
import { ITodo } from "../types/types"

export const filterTodoByTitle = (state: ITodo[], title: string) => {
    if (title === '') {
        return state
    }
    return state.filter(t => (
        t.title.includes(title)
    ))
}
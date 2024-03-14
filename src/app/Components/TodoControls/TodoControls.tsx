import React from 'react'
import { useAppDispatch } from '@/app/hooks/rtkHooks'
import { openModal, closeModal } from '@/app/store/modal/modal-slice';
import { deleteTodo } from '@/app/store/todos/todos-slice';
import { toggleTodo } from '@/app/store/todos/todos-slice';
import { Button } from '@/app/ui/Button/Button'
import { Pen, Check } from 'lucide-react'
import { ITodo } from '@/app/types/types'
import styles from './TodoControls.module.scss'

export default function TodoControls({todo}: {todo: ITodo}) {
    const dispatch = useAppDispatch();

    const openChangeModalHandler = (id: string) => {
        dispatch(openModal(id))
    }
    const todoToggleHandler = (id: string, completed: boolean) => {
        dispatch(toggleTodo({id, completed}))
    }
    const deleteTodoHandler = (id: string) => {
        dispatch(deleteTodo(id))
    }
    return (
    <div className={styles.controls}>
        <Button
            onClick={() => openChangeModalHandler(todo.id)}>
            <Pen/>
        </Button>
        <Button
            onClick={() => todoToggleHandler(todo.id, todo.completed)}>
            <Check/>
        </Button>
        <Button
            className={styles.deleteBtn}
            onClick={() => deleteTodoHandler(todo.id)}
            >
            Delete
        </Button>
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks'
import { getAllTodos } from '@/app/store/todos/todos-slice';
import { deleteTodo } from '@/app/store/todos/todos-slice';
import { toggleTodo } from '@/app/store/todos/todos-slice';
import { changeTodo } from '@/app/store/todos/todos-slice';
import { filterTodoByTitle } from '@/app/utils/filterTodoByTitle';
import Spinner from '../Spinner/Spinner';
import SearchInput from '../SearchInput/SearchInput';
import { Button } from '@/app/ui/Button/Button';
import { Pen, Check } from 'lucide-react';
import styles from './TodoList.module.scss'
import CreateTodoModal from '../CreateTodoModal/CreateTodo';
import ChangeTodoModal from '../ChangeTodoModal/ChangeTodoModal';

export default function TodoList() {
    const dispatch = useAppDispatch();
    const todos = useAppSelector(state => state.todosReducer.todos);
    const status = useAppSelector(state => state.todosReducer.status);
    const searchedTodo = useAppSelector(state => state.filter.searchedValue);
    const filteredTodos = filterTodoByTitle(todos, searchedTodo)
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [changeModalIsOpen, setChangeModalIsOpen] = useState(false);
    const [changeTodosId, setChangeTodosId] = useState<string | undefined>();

    const openCreateModalHandler = () => {
        setCreateModalIsOpen(prev => !prev)
    }
    const openChangeModalHandler = (id: string) => {
        setChangeModalIsOpen(prev => !prev);
        setChangeTodosId(id);
    }
    const todoToggleHandler = (id: string, completed: boolean) => {
        dispatch(toggleTodo({id, completed}))
    }
    const deleteTodoHandler = (id: string) => {
        dispatch(deleteTodo(id))
    }
    useEffect(() => {
        dispatch(getAllTodos())
    }, [])
    return (
    <>
        {status === 'loading'  && 
            <Spinner />
        }
        {status === 'loaded' &&
            <>
                <CreateTodoModal
                    isOpen={createModalIsOpen}
                    setIsOpen={setCreateModalIsOpen}
                    title='What are you want to do?' />
                <ChangeTodoModal
                    id={changeTodosId}
                    isOpen={changeModalIsOpen}
                    setIsOpen={setChangeModalIsOpen}
                    title='Change your todo' />
                <section className={styles.wrapper}>
                    <div className={styles.controlsWrapper}>
                        <Button className={styles.addBtn} onClick={openCreateModalHandler}>
                            Add todo
                        </Button>
                        <SearchInput />
                    </div>
                    {filteredTodos.map(t => (
                        <div className={styles.todoWrapper} key={t.id}>
                            <div className={styles.titleWrapper}>
                                <h5 className={styles.title}>
                                    {t.title}
                                </h5>
                                <input className={styles.checkbox}
                                    type='checkbox'
                                    checked={t.completed}
                                    disabled />
                            </div>
                            <p className={styles.desc}>
                                {t.desc}
                            </p>
                            <div className={styles.controls}>
                                <Button
                                    onClick={() => openChangeModalHandler(t.id)}>
                                    <Pen/>
                                </Button>
                                <Button
                                    onClick={() => todoToggleHandler(t.id, t.completed)}>
                                    <Check/>
                                </Button>
                            <Button
                                className={styles.deleteBtn}
                                onClick={() => deleteTodoHandler(t.id)}
                                >
                                Delete
                            </Button>
                            </div>
                        </div>
                    ))}
                </section>
            </>
        }
    </>
  )
}

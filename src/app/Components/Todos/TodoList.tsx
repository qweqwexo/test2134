'use client'
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks'
import { getAllTodos } from '@/app/store/todos/todos-slice';
import { filterTodoByTitle } from '@/app/utils/filterTodoByTitle';
import Spinner from '../Spinner/Spinner';
import SearchInput from '../SearchInput/SearchInput';
import { Button } from '@/app/ui/Button/Button';
import styles from './TodoList.module.scss'
import CreateTodoModal from '../CreateTodoModal/CreateTodo';
import ChangeTodoModal from '../ChangeTodoModal/ChangeTodoModal';
import TodoControls from '../TodoControls/TodoControls';

export default function TodoList() {
    const dispatch = useAppDispatch();
    const todos = useAppSelector(state => state.todosReducer.todos);
    const status = useAppSelector(state => state.todosReducer.status);
    const searchedTodo = useAppSelector(state => state.filter.searchedValue);
    const changeModalIsOpen = useAppSelector(state => state.modal.isOpen);
    const filteredTodos = filterTodoByTitle(todos, searchedTodo)
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

    const openCreateModalHandler = () => {
        setCreateModalIsOpen(prev => !prev)
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
                    isOpen={changeModalIsOpen}
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
                            <TodoControls todo={t} />
                        </div>
                    ))}
                </section>
            </>
        }
    </>
  )
}

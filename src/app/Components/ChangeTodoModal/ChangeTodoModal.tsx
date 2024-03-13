'use client'
import { useState } from "react"
import { Dispatch, SetStateAction } from "react"
import { useAppDispatch } from '@/app/hooks/rtkHooks';
import { changeTodo } from '@/app/store/todos/todos-slice';
import { v4 } from 'uuid';
import { ChangeEvent } from 'react';
import Modal from "@/app/ui/Modal/Modal"
import { Input } from "@/app/ui/Input/Input"
import { Button } from "@/app/ui/Button/Button"
import styles from './ChangeTodoModal.module.scss'

export default function ChangeTodoModal({isOpen, setIsOpen, title, id}:
  {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, title: string, id: string | undefined}) {


  const [todoTitle, setTodoTitle] = useState<string | undefined>();
  const [todoDesc, setTodoDesc] = useState<string | undefined>();
  const [isToggled, setIsToggled] = useState(false);
  const dispatch = useAppDispatch();

  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  }
  const setDescHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTodoDesc(e.target.value);
  }
  const toggleHandler = () => {
    setIsToggled(prev => !prev)
  }
  const onChangeHandler = () => {
    dispatch(changeTodo({id, title: todoTitle, desc: todoDesc, completed: isToggled}))
    setTodoTitle('');
    setTodoDesc('');
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
                    <Input
                      value={todoTitle}
                      onChange={setTitleHandler}
                      placeholder='Type some title' />
                    <Input
                      value={todoDesc}
                      onChange={setDescHandler}
                      placeholder='Type some desc' />
                      <div className={styles.checkboxWrapper}>
                        <span>Completed: </span>
                        <input
                            type="checkbox"
                            onChange={toggleHandler}
                            className={styles.checkbox}
                        />
                      </div>
                    <Button onClick={onChangeHandler}>
                        Change todo
                    </Button>
    </Modal>
  )
}

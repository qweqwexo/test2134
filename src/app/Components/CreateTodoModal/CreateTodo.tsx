'use client'
import { useState } from "react"
import { Dispatch, SetStateAction } from "react"
import { useAppDispatch } from '@/app/hooks/rtkHooks';
import { postNewTodo } from '@/app/store/todos/todos-slice';
import { v4 } from 'uuid';
import { ChangeEvent } from 'react';
import Modal from "@/app/ui/Modal/Modal"
import { Input } from "@/app/ui/Input/Input"
import { Button } from "@/app/ui/Button/Button"

export default function CreateTodoModal({isOpen, setIsOpen, title}:
  {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, title: string}) {


  const [todoTitle, setTodoTitle] = useState('');
  const [todoDesc, setTodoDesc] = useState('');
  const dispatch = useAppDispatch();

  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  }
  const setDescHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTodoDesc(e.target.value);
  }
  const onCreateHandler = () => {
    if (todoTitle === '' || todoDesc === ''){
      return
    }
    dispatch(postNewTodo({id: v4(), title: todoTitle, desc: todoDesc, completed: false}))
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
                    <Button onClick={onCreateHandler}>
                        Add some todo
                    </Button>
    </Modal>
  )
}

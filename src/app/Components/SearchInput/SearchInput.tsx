'use client'
import { useAppDispatch } from "@/app/hooks/rtkHooks";
import { setSearchedValue } from "@/app/store/filter/filter-slice";
import { Input } from "@/app/ui/Input/Input"
import { ChangeEvent } from "react";

export default function SearchInput() {
    const dispatch = useAppDispatch();
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchedValue(e.target.value))
    }
    return (
    <Input
        onChange={onChangeHandler}
        placeholder="Search some todo" />
  )
}

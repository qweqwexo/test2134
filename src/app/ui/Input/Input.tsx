import { InputHTMLAttributes } from "react"
import styles from './Input.module.scss'

export const Input:React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const {children, ...rest} = props;
    return (
        <input className={styles.Input} {...rest} />
  )
}

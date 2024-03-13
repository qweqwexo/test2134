import { ButtonHTMLAttributes } from "react"
import styles from './Button.module.scss'

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>>  = (props) => {
    const {children, ...rest} = props;
    return (
    <button className={styles.button} {...rest}>
        {children}
    </button>
  )
}

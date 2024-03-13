import styles from './Spinner.module.scss'

export default function Spinner() {
  return (
    <div>
        <div className={styles.ldsRing}><div></div></div>
    </div>
  )
}

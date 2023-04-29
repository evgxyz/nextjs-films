
import { MainMenu } from '@/components/general/MainMenu'
import styles from './Header.module.scss'

export function Header() {
  return (
    <div className={styles.header}>
      <div>header</div>
      <div><MainMenu /></div>
    </div>
  )
}
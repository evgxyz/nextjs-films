
import Link from 'next/link'
import styles from './MainMenu.module.scss'

export function MainMenu() {
  return (
    <div className={styles.mainMenu}>
      <p>
        <Link href='/'>Home</Link>{' | '}
        <Link href='/films'>Films</Link>{' | '}
        <Link href='/about'>About</Link>
      </p>
    </div>
  )
}
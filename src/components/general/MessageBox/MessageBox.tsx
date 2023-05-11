
import styles from './MessageBox.module.scss';

interface MessageBoxProps {
  type: 'INFO' | 'WARN' | 'ERROR',
  title: string,
  text?: string,
}

export function MessageBox({type = 'INFO', title, text}: MessageBoxProps) {
  return (
    <div className={styles.messageBox}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.text}>{text}</div>
    </div>
  )
}
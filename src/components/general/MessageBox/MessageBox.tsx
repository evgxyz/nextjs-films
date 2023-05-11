
import styles from './MessageBox.module.scss';

interface MessageBoxProps {
  type: 'INFO' | 'WARN' | 'ERROR',
  title: string,
  text?: string,
}

export function MessageBox({type = 'INFO', title, text}: MessageBoxProps) {
  return (
    <div className={styles.messageBox}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.text}>{text}</div>
    </div>
  )
}
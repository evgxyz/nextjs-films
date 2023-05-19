
import css from './LoadingBox.module.scss';

export function LoadingBox() {
  return (
    <div className={css.body}>
      <div className={css.icon}></div>
    </div>
  )
}
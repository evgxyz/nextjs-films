
import css from './PageTitle.module.scss';

interface PageTitleProps {
  title: React.ReactNode,
  subTitle?: React.ReactNode,
}

export function PageTitle({title, subTitle = ''}: PageTitleProps) {
  return (
    <div className={css['box']}>
      <h1 className={css['title']}>{title}</h1>
      <h2 className={css['subtitle']}>{subTitle}</h2>
    </div>
  )
}

import Link from '@/next/Link';
import {setURLParam} from '@/units/url';
import _ from 'lodash';
import css from './Pagination.module.scss';

interface PaginationProps {
  baseUrl: string, 
  paramName: string
  start: number, 
  count: number,
  curr: number,
}

export function Pagination({baseUrl, paramName, start, count, curr}: PaginationProps) {
  return (
    <div className={css['body']}>
      { _.range(start, start + count).map(i => {
            if (i !== curr) {
              const url = setURLParam(baseUrl, paramName, i.toString());
              return (
                <Link key={i} href={url}>
                  <div className={css['item']}>{i}</div>
                </Link>
              )
            } else {
              return (
                <div 
                  key={i} 
                  className={[css['item'], css['curr-item']].join(' ')}
                >{i}</div>
              )
            }
          }
        )
      }
    </div>
  )
}
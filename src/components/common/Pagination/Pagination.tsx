
import Link from '@/next/Link';
import {setURLParam} from '@/units/url';
import _ from 'lodash';
import css from './Pagination.module.scss';

interface PaginationProps {
  baseUrl: string, 
  paramName: string
  start: number, 
  count: number
}

export function Pagination({baseUrl, paramName, start, count}: PaginationProps) {
  return (
    <div className={css['body']}>
      { _.range(start, start + count).map(i => {
            const url = setURLParam(baseUrl, paramName, i.toString());
            return (
              <Link href={url}>
                <div key={i} className={css['item']}>{i}</div>
              </Link>
            );
          }
        )
      }
    </div>
  )
}
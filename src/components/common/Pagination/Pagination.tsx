
import Link from '@/next/Link';
import {setURLParam} from '@/units/url';
import _ from 'lodash';
import css from './Pagination.module.scss';

interface PaginationProps {
  baseUrl: string, 
  paramName: string
  start: number, 
  end: number,
  curr: number,
}

export function Pagination({baseUrl, paramName, start, end, curr}: PaginationProps) {  

  const around = 2;
  const htmlLeft = [];
  const htmlRight = [];
  const html = [];

  start = Math.min(start, curr);
  end = Math.max(end, curr);

  if (curr > start) {
    htmlLeft.push(
      <Link href={setURLParam(baseUrl, paramName, (curr - 1).toString())}>
        <div className={css['item']}>{'<'}</div>
      </Link>
    );
  }
   
  const outStart = Math.max(curr - around, start);
  
  if (outStart > start) {
    htmlLeft.push(
      <Link href={setURLParam(baseUrl, paramName, start.toString())}>
        <div className={css['item']}>{start}</div>
      </Link>
    );

    if (outStart > start + 1) {
      htmlLeft.push('...');
    }
  }
  
  const outEnd = Math.min(curr + around, end);
  
  if (outEnd < end) {
    htmlRight.push(
      <Link href={setURLParam(baseUrl, paramName, end.toString())}>
        <div className={css['item']}>{end}</div>
      </Link>
    );

    if (outEnd < end - 1) {
      htmlRight.unshift('...');
    }
  }

  if (curr < end) {
    htmlRight.push(
      <Link href={setURLParam(baseUrl, paramName, (curr + 1).toString())}>
        <div className={css['item']}>{'>'}</div>
      </Link>
    );
  }
  
  for (let p = outStart; p <= outEnd; p++) {
    if (p !== curr) {
      html.push(
        <Link href={setURLParam(baseUrl, paramName, p.toString())}>
          <div className={css['item']}>{p}</div>
        </Link>
      )
    } else {
      html.push(
        <div className={[css['item'], css['curr-item']].join(' ')}>{p}</div>
      )  
    }
  }
  
  return (
    <div className={css['body']}>
      {[...htmlLeft, ...html, ...htmlRight]}
    </div>
  );
}
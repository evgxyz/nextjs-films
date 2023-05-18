
import {useAppSelector} from '@/store';
import Link, {LinkProps} from 'next/link';
import {langDefault} from '@/units/lang';

interface LinkHocProps extends LinkProps {
  children: React.ReactNode
}

export default function LinkHoc(props: LinkHocProps) {
  
  const lang = useAppSelector(state => state.settings.lang);

  if (lang !== langDefault) {
    const [pathStr, queryStr] = props.href.toString().split('?');
    const query = new URLSearchParams(queryStr);
    query.set('lang', lang);
    const queryStr2 = query.toString();
    let href = pathStr;
    if (queryStr2 !== '') {
      href += '?' + queryStr2;
    }
    props = {...props, href};
  } 

  return (
    <Link {...props}>
      {props.children}
    </Link>
  )
}
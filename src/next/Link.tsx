
import {useAppSelector} from '@/store';
import Link, {LinkProps} from 'next/link';

interface LinkHocProps extends LinkProps {
  children: React.ReactNode
}

export default function LinkHoc(props: LinkHocProps) {

  const lang = useAppSelector(state => state.settings.lang);

  const [pathStr, queryStr] = props.href.toString().split('?');
  const query = new URLSearchParams(queryStr);
  query.append('lang', lang);
  const href = pathStr + '?' + query.toString();

  return (
    <Link {...{...props, href}}>
      {props.children}
    </Link>
  )
}
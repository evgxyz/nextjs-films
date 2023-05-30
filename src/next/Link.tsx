
import {useAppSelector} from '@/store';
import Link, {LinkProps} from 'next/link';
import {setURLParam} from '@/units/url';
import {langDefault} from '@/units/lang';

interface LinkHocProps extends LinkProps {
  children: React.ReactNode
}

export default function LinkHoc(props: LinkHocProps) {
  
  const lang = useAppSelector(state => state.settings.lang);

  if (lang !== langDefault) {
    const href = setURLParam(props.href.toString(), 'lang', lang);
    props = {...props, href};
  }

  return (
    <Link {...props}>
      {props.children}
    </Link>
  )
}
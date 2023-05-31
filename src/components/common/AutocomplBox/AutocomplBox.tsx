
import {Autocompl} from '@/units/components';
import css from './AutocomplBox.module.scss';

interface AutocomplBoxProps {
  autocompl: Autocompl,
  callback: (value: string) => void
}

export function AutocomplBox({autocompl, callback}: AutocomplBoxProps) {  
  return (
    <div className={css['box']}>
      <ul className={css['list']}>
        { autocompl.map((item, idx) =>
            <li key={idx} onClick={() => callback(item)}>
              {item}
            </li>
          )
        }
      </ul>
    </div>
  );
}
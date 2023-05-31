
import {Autocompl} from '@/units/components';
import css from './AutocomplBox.module.scss';

interface AutocomplBoxProps {
  autocompl: Autocompl,
  setValue: (value: string) => void
}

export function AutocomplBox({autocompl, setValue}: AutocomplBoxProps) {
  return (
    <div className={css['body']}>
      <ul className={css['list']}>
        { autocompl.map((item, idx) =>
            <li key={idx} onClick={() => setValue(item)}>
              {item}
            </li>
          )
        }
      </ul>
    </div>
  );
}
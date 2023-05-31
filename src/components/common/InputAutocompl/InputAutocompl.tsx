
import {useState, useId} from 'react';
import {Autocompl} from '@/units/components';
import css from './InputAutocompl.module.scss';

interface InputAutocomplProps {
  value: string | undefined,
  autocompl: Autocompl,
  callbackOnFocus: () => void,
  callbackOnChange: (value: string) => void,
  callbackOnSelect: (value: string) => void,
}

export function InputAutocompl(props: InputAutocomplProps) {

  const {
    value,
    autocompl, 
    callbackOnFocus, 
    callbackOnChange, 
    callbackOnSelect,
  } = props;

  const id = useId();
  const [expFlag, setExpFlag] = useState(false);

  const inputOnFocus = function() {
    callbackOnFocus();
    setExpFlag(true);
  }

  const inputOnBlur = function(ev: React.FocusEvent) {
    if (!ev.relatedTarget?.closest('#' + id.replace(/:/g, '\\:'))) {
      setExpFlag(false);
    }
  }

  const inputOnChange = function(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.currentTarget.value;
    callbackOnChange(value);
    setExpFlag(true);
  }

  const itemOnClick = function(value: string) {
    callbackOnSelect(value);
    setExpFlag(false);
  }

  return (
    <div id={id} className={css['body']}>
      <input type='text' 
        value={value} 
        onChange={inputOnChange}
        onFocus={inputOnFocus}
        onBlur={inputOnBlur}
      />
      <ul 
        className={[css['list'], expFlag ? css['--exp'] : ''].join(' ')}
        tabIndex={0}
      >
        { autocompl.map((item, idx) =>
            <li key={idx} onClick={() => itemOnClick(item)}>
              {item}
            </li>
          )
        }
      </ul>
    </div>
  );
}
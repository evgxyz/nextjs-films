
import {useState, useId} from 'react';
import {Autocompl} from '@/units/components';

interface InputAutocomplProps {
  value: string | undefined,
  autocompl: Autocompl,
  callbackOnFocus: () => void,
  callbackOnChange: (value: string) => void,
  callbackOnSelect: (value: string) => void,
  css: {readonly [key: string]: string},
}

export function InputAutocompl(props: InputAutocomplProps) {
  const {
    value,
    autocompl, 
    callbackOnFocus, 
    callbackOnChange, 
    callbackOnSelect,
    css
  } = props;

  const elemId = useId();
  const [openFlag, setOpenFlag] = useState(false);

  const inputOnFocus = function() {
    callbackOnFocus();
    setOpenFlag(true);
  }

  const inputOnBlur = function(ev: React.FocusEvent) {
    if (!ev.relatedTarget?.closest('#' + elemId.replace(/:/g, '\\:'))) {
      setOpenFlag(false);
    }
  }

  const inputOnChange = function(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.currentTarget.value;
    callbackOnChange(value);
    setOpenFlag(true);
  }

  const itemOnClick = function(value: string) {
    callbackOnSelect(value);
    setOpenFlag(false);
  }

  return (
    <div 
      id={elemId} 
      className={[css['body'], openFlag ? css['--open'] : css['--closed']].join(' ')}
    >
      <input type='text' 
        className={css['input']}
        value={value} 
        onChange={inputOnChange}
        onFocus={inputOnFocus}
        onBlur={inputOnBlur}
      />
      { autocompl.length > 0 &&
        <ul className={css['list']} tabIndex={0}>
          { autocompl.map((item, idx) =>
              <li key={idx} onClick={() => itemOnClick(item)}>
                {item}
              </li>
            )
          }
        </ul>
      }
    </div>
  );
}
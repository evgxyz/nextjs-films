
import {useState, useId} from 'react';
import {Autocompl} from '@/units/components';
import sha1 from 'js-sha1';

interface InputAutocomplProps {
  value: string,
  autocompl: Autocompl,
  onFocus: () => void,
  onChange: (value: string) => void,
  onSelect: (value: string) => void,
  css: {readonly [key: string]: string},
}

export function InputAutocompl(props: InputAutocomplProps) {
  const {
    value,
    autocompl, 
    onFocus, 
    onChange, 
    onSelect,
    css
  } = props;

  const elemId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const inputOnFocus = function() {
    onFocus();
    setIsOpen(true);
  }

  const inputOnBlur = function(ev: React.FocusEvent) {
    if (!ev.relatedTarget?.closest('#' + elemId.replace(/:/g, '\\:'))) {
      setIsOpen(false);
    }
  }

  const inputOnChange = function(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.currentTarget.value;
    onChange(value);
    setIsOpen(true);
  }

  const itemOnClick = function(value: string) {
    onSelect(value);
    setIsOpen(false);
  }

  const inputClearOnClick = function() {
    onChange('');
    setIsOpen(false);
  }

  return (
    <div 
      id={elemId} 
      className={[css['body'], isOpen ? css['--open'] : css['--closed']].join(' ')}
    >
      <div className={css['input-wrapper']}>
        <input type='text' 
          style={{paddingRight: '1.8em'}}
          className={css['input']}
          value={value} 
          onChange={inputOnChange}
          onFocus={inputOnFocus}
          onBlur={inputOnBlur}
        />
        { value !== '' && 
          <div className={css['input-clear']} onClick={inputClearOnClick}></div> 
        }
      </div>
      <div className={css['list-wrapper']}>
        { autocompl.length > 0 &&
          <ul className={css['list']} tabIndex={0}>
            { autocompl.map(item =>
                <li key={sha1(item)} onClick={() => itemOnClick(item)}>
                  {item}
                </li>
              )
            }
          </ul>
        }
      </div>
    </div>
  );
}

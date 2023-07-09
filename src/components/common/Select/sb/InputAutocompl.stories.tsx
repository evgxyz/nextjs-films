
import type {Meta, StoryObj, StoryFn} from '@storybook/react';

import {InputAutocompl, InputAutocomplCss} from '.';
import {useState} from 'react';
import _ from 'lodash';

const meta: Meta<typeof InputAutocompl> = {
  title: 'InputAutocompl',
  component: InputAutocompl,
  decorators: [
    (Story: StoryFn) => (
      <div style={{width: '12rem'}}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof InputAutocompl>;


const InputAutocomplFC = (props: React.ComponentProps<typeof InputAutocompl>) => {
  const [value, setValue] = useState(props.value);
  const [autocompl, setAutocompl] = useState(props.autocompl);

  const callbackOnChange = (value: string) => {
    setValue(value);
    const autocompl = 
      (value !== '') ?
        [1, 2, 3, 4].map(i => value + '-' + i.toString()) 
      : [];
    setAutocompl(autocompl);
  } 

  const callbackOnFocus = () => {
    const value = props.value;
    setValue(value);
    const autocompl = 
      (value !== '') ?
        [1, 2, 3, 4].map(i => value + '-' + i.toString()) 
      : [];
    setAutocompl(autocompl);
  }

  return (
    <InputAutocompl 
      {...props}
      value={value}
      autocompl={autocompl}
      callbackOnFocus={callbackOnFocus}
      callbackOnChange={callbackOnChange}
      callbackOnSelect={callbackOnChange}
    />
  );
}

export const Default: Story = {
  args: {
    value: 'text',
    autocompl: ['suggest 1', 'suggest 2', 'suggest 3'],
    callbackOnFocus: () => {},
    callbackOnChange: () => {},
    callbackOnSelect: () => {},
    css: InputAutocomplCss
  },
  render: (args) => (
    <InputAutocomplFC {...args} />
  )
};

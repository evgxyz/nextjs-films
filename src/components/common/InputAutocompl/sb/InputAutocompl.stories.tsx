
import type {Meta, StoryObj, StoryFn} from '@storybook/react';

import {InputAutocompl, InputAutocomplCss} from '.';
import {useState} from 'react';

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

const InputAutocomplWrapped = (props: React.ComponentProps<typeof InputAutocompl>) => {
  const [value, setValue] = useState(props.value);
  const [autocompl, setAutocompl] = useState(props.autocompl);

  const onChange = (value: string) => {
    setValue(value);
    const autocompl = 
      (value !== '')
      ? [1, 2, 3, 4].map(i => value + '-' + i.toString()) 
      : [];
    setAutocompl(autocompl);
  } 

  const onFocus = () => {
    const value = props.value;
    setValue(value);
    const autocompl = 
      (value !== '')
      ? [1, 2, 3, 4].map(i => value + '-' + i.toString()) 
      : [];
    setAutocompl(autocompl);
  }

  return (
    <InputAutocompl 
      {...props}
      value={value}
      autocompl={autocompl}
      onFocus={onFocus}
      onChange={onChange}
      onSelect={onChange}
    />
  );
}

export const Default: Story = {
  args: {
    value: '',
    autocompl: [],
    onFocus: () => {},
    onChange: () => {},
    onSelect: () => {},
    css: InputAutocomplCss
  },
  render: (args) => (
    <InputAutocomplWrapped {...args} />
  )
};


import type {Meta, StoryObj, StoryFn} from '@storybook/react';

import {Select, SelectCss} from '.';
import {useState} from 'react';

const meta: Meta<typeof Select> = {
  title: 'Select',
  component: Select,
  decorators: [
    (Story: StoryFn) => (
      <div style={{display: 'inline-block'}}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Select>;

const SelectWrapped = (props: React.ComponentProps<typeof Select>) => {
  const [value, setValue] = useState(props.value);

  const onSelect = (value: string) => {
    setValue(value);
  }

  return (
    <>
      <div style={{marginBottom: '10px'}}>
        {'value: ' + value}
      </div>
      <Select 
        {...props}
        value={value}
        options={props.options}
        onSelect={onSelect}
      />
    </>
  );
}

export const Default: Story = {
  args: {
    value: '2',
    options: [
      {value: '1', text: 'Option 1'},
      {value: '2', text: 'Option 2'},
      {value: '3', text: 'Option 3'},
      {value: '4', text: 'Option 4'}
    ],
    onSelect: () => {},
    css: SelectCss
  },
  render: (args) => (
    <SelectWrapped {...args} />
  )
};

import { Meta, StoryObj } from '@storybook/react'

import { Button, CreateDeck } from '@/components'

const meta = {
  title: 'Modals/Create Deck',
  component: CreateDeck,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ margin: '3em', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    trigger: <Button variant={'primary'}>Create Deck</Button>,
  },
} satisfies Meta<typeof CreateDeck>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: args => {
    return (
      <CreateDeck
        trigger={args.trigger}
        onSubmit={data => {
          // eslint-disable-next-line no-console
          console.log(data)
        }}
      />
    )
  },
}

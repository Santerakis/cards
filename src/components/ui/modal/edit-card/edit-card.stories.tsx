import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components'
import { EditCardModal } from '@/components/ui/modal/edit-card/edit-card-modal.tsx'

const meta = {
  title: 'Modals/Edit Card Modal',
  component: EditCardModal,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ margin: '3em', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: <Button variant={'primary'}>Edit card</Button>,
    answer: 'How "This" works in JavaScript?',
    question: 'This is how "This" works in JavaScript',
  },
  parameters: {
    controls: {
      exclude: /(?:\b|')(children)(?:\b|')/g,
    },
  },
} satisfies Meta<typeof EditCardModal>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: args => {
    const [open, setOpen] = useState<boolean>(false)

    return (
      <EditCardModal
        onSubmit={data => {
          // eslint-disable-next-line no-console
          console.log(data)
        }}
        answer={args.answer}
        question={args.question}
        isOpen={open}
        setIsOpen={setOpen}
      >
        {args.children}
      </EditCardModal>
    )
  },
}

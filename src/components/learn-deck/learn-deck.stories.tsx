import { Meta, StoryObj } from '@storybook/react'

import { LearnDeck } from '@/components/learn-deck/learn-deck.tsx'

const meta = {
  title: 'Modals/Learn desk',
  component: LearnDeck,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ margin: '3em', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LearnDeck>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    packName: 'Pack Name',
    question: 'How "This" works in JavaScript?',
    attempts: 10,
    answer: 'This is how "This" works in JavaScript',
    loadNextQuestion: () => {},
  },
  render: ({ answer, attempts, question, loadNextQuestion, packName }) => {
    return (
      <LearnDeck
        packName={packName}
        question={question}
        attempts={attempts}
        answer={answer}
        loadNextQuestion={loadNextQuestion}
      />
    )
  },
}

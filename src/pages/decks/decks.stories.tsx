import { Meta, StoryObj } from '@storybook/react'

import { Decks } from '@/pages'

const meta = {
  title: 'Pages/Decks',
  component: Decks,
  tags: ['autodocs'],
} satisfies Meta<typeof Decks>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

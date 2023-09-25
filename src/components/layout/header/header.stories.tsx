import { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/components'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Header_App: Story = {
  args: {},
}

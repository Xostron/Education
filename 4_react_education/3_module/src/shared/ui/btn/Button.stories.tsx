import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "shared/ui/btn/"

const meta: Meta<typeof Button> = {
	title: "shared/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],

	argTypes: {},
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
	args: {},
}

export const Secondary: Story = {
	args: {},
}

export const Large: Story = {
	args: {},
}

export const Small: Story = {
	args: {},
}

export const Warning: Story = {
	args: {},
}

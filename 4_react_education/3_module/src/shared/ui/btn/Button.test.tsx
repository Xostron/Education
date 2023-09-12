import {render, screen} from '@testing-library/react'
import { Button, ThemeButton } from 'shared/ui/btn/'

//  test component

describe("Button", () => {
	test("Проверка кнопки render", () => {
		render(<Button>Test</Button>)
        expect(screen.getByText('Test')).toBeInTheDocument()
	})
	test("Проверка кнопки theme CLEAR", () => {
		render(<Button theme={ThemeButton.CLEAR}>Test</Button>)
        expect(screen.getByText('Test')).toBeInTheDocument()
	})
})
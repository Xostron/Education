import {render, screen} from '@testing-library/react'
import { Button, ThemeButton } from 'shared/ui/btn/'

//  test component

describe("classnames", () => {
	test("Проверка кнопки", () => {
		render(<Button>Test</Button>)
        expect(screen.getByText('Test')).toBeInTheDocument()
	})
	test("Проверка кнопки CLEAR", () => {
		render(<Button theme={ThemeButton.CLEAR}>Test</Button>)
        expect(screen.getByText('Test')).toBeInTheDocument()
	})
})
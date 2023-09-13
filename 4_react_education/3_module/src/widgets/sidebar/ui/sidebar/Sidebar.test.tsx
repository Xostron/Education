import {fireEvent, render, screen} from '@testing-library/react' 
import { withTranslation } from 'react-i18next'
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/fn'
import { Sidebar } from 'widgets/sidebar/ui/sidebar'


//  test component

describe("Sidebar", () => {
	test("Проверка Sidebar render", () => {
		renderWithTranslation(<Sidebar/>)
        expect(screen.getByTestId('@sidebar')).toBeInTheDocument()
	})
	test("Переключение скрыть/показать Sidebar", () => {
		renderWithTranslation(<Sidebar/>)
		const toggleBtn = screen.getByTestId('@sidebar-toggle')
        expect(screen.getByTestId('@sidebar')).toBeInTheDocument()
		fireEvent.click(toggleBtn)
		expect(screen.getByTestId('@sidebar')).toHaveClass('collapsed')
	})
}) 


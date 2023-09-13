import {render, screen} from '@testing-library/react' 
import { withTranslation } from 'react-i18next'
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/fn'
import { Sidebar } from 'widgets/sidebar/ui/sidebar'


//  test component

describe("Sidebar", () => {
	test("Проверка Sidebar render", () => {
		renderWithTranslation(<Sidebar/>)
        expect(screen.getByTestId('test2')).toBeInTheDocument()
	})

}) 


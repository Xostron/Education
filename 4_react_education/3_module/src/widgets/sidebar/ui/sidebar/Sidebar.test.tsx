import {render, screen} from '@testing-library/react'
import { withTranslation } from 'react-i18next'
import { Sidebar } from 'widgets/sidebar/ui/sidebar'


//  test component
const __IS_DEV__ = true 

describe("Sidebar", () => {
	test("Проверка Sidebar render", () => {
        const SbarWithTranslation = withTranslation()(Sidebar)
		render(<SbarWithTranslation/>)
        expect(screen.getByTestId('Test')).toBeInTheDocument()
	})

}) 
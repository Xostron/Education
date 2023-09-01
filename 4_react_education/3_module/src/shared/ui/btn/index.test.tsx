import {render, screen} from '@testing-library/react'
import { Button } from 'shared/ui/btn/'

//  test component

describe("classnames", () => {
	test("Проверка основного стиля", () => {
		render(<Button>Test</Button>)
        expect(screen.getByText('Test') )
	})

})
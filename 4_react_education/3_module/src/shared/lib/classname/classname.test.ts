// import { classname } from "./classname"

import { classname } from 'shared/lib/classname/classname'

// Unit test
describe("classnames", () => {
	test("Проверка основного стиля", () => {
		expect(classname("main", {}, [])).toBe("main")
	})
	test("Проверка основного стиля + модификатор {}", () => {
		expect(classname("main", { active: true, dark: undefined }, [])).toBe(
			"main active"
		)
	})
	test("Проверка основного стиля + дополнительного []", () => {
		expect(classname("main", {}, ["out"])).toBe("main out")
	})
	test("Проверка полного набора стилей", () => {
		expect(classname("main", { active: true }, ["out"])).toBe(
			"main out active"
		)
	})
})

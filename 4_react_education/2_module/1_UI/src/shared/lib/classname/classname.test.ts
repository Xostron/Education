import { classname } from './classname'

describe("classnames", () => {
    test('Проверка основного стиля',()=>{
        expect(classname('main',{},[])).toBe('main')
    })
    test('Проверка основного стиля + модификатор {}',()=>{
        expect(classname('main',{'active':true, 'abs':false},[])).toBe('main active')
    })
    test('Проверка основного стиля + дополнительного []',()=>{
        expect(classname('main',{},['out'])).toBe('main out')
    })
    test('Проверка полного набора стилей',()=>{
        expect(classname('main',{'active':true},['out'])).toBe('main out active')
    })
})

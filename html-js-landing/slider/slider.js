const items_children = Array.from(document.querySelectorAll('.item'))
const points = items_children.slice(1, items_children.length - 1)
const children = document.querySelector('.children')
const OFFSET = - children.clientWidth
let current = 1
let CurrentOffset = OFFSET * current
children.style.transform = `translateX(${CurrentOffset}px)`

/*
добавление точек-кнопок прокрутки
*/
let fragment = new DocumentFragment();
let point = document.querySelector('.point')
let div = new Array(points.length).fill(0).map(val => document.createElement('div'))
for (let i = 0; i < points.length; i++) {
    pointActive(current)
    div[i].addEventListener('click', () => handlerPoint(i + 1))
    fragment.append(div[i])
    console.log(div[i])
}
point.append(fragment)

/*Анимация*/
/*
perFrames - кол-во кадров в секунду
duration - продолжительность анимации
period - время одного кадра
*/
const perFrames = 30
const duration = 600
const period = duration / perFrames
const OFFSET_ANIM = children.clientWidth / perFrames
// флаг - работает анимация
let loading = false
let timerId



/*ФУНКЦИИ*/
// пуск/стоп анимации
function start(mode, shift, to) {
    // пуск анимации
    timerId = setInterval(() => animationTranslateX(mode, to), period)
    // подсветка точки
    pointActive(current)
    // стоп анимации
    setTimeout(() => {
        clearInterval(timerId)
        loading = false
        if (shift) {
            CurrentOffset = OFFSET * current
            children.style.transform = `translateX(${CurrentOffset}px)`
        }
    }, duration)
}

// анимация - перемещение
function animationTranslateX(mode, to = 0) {
    if (mode === 'prev') {
        CurrentOffset = CurrentOffset + OFFSET_ANIM
        children.style.transform = `translateX(${CurrentOffset}px)`
    }
    else if (mode === 'next') {
        CurrentOffset = CurrentOffset - OFFSET_ANIM
        children.style.transform = `translateX(${CurrentOffset}px)`
    }
    if (mode === 'prevP') {
        CurrentOffset = CurrentOffset + OFFSET_ANIM * (to)
        children.style.transform = `translateX(${CurrentOffset}px)`
    }
    else if (mode === 'nextP') {
        CurrentOffset = CurrentOffset - OFFSET_ANIM * (to)
        children.style.transform = `translateX(${CurrentOffset}px)`
    }
}

// handlers arrow
function control(mode) {
    let shift = false
    if (!loading) {
        loading = true
        if (mode === 'prev') {
            if (current > 1) {
                --current
            }
            else {
                current = points.length
                shift = true
            }
        }
        else if (mode === 'next') {
            if (current < points.length) {
                ++current
            }
            else {
                current = 1
                shift = true
            }
        }
        start(mode, shift)
        console.log('====', mode, current)
    }

}

// подсветка точки
function pointActive(current) {
    for (let i = 0; i < points.length; i++) {
        if (i === current - 1) div[i].className = 'point_item active'
        else div[i].className = 'point_item'
    }
}

// handler point
function handlerPoint(i) {
    let shift = false
    let mode = ''
    let to = 0
    if (!loading) {
        loading = true
        if (i < current) {
            mode = 'prevP'
            to = current - i
            current = i
        }
        else if (i > current) {
            mode = 'nextP'
            to = i - current
            current = i
        }
        else if (current === i) {

        }
        start(mode, shift, to)
        console.log('====', mode, current, to)
    }
}



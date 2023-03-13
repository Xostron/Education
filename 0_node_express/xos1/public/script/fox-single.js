const field1 = document.querySelector(".field1")
let fieldTemp = []

fieldTemp = generationP(8)
Field(field1, fieldTemp)

field1.addEventListener("click", hndlCell)

function hndlCell(event) {
  const cells = event.currentTarget.querySelectorAll(".cell")
  if (event.target === event.currentTarget) {
    eraseDF(cells)
  } else {
    const absId = Array.from(cells).indexOf(event.target)
    
    dfRender(cells, dirFinder(absId))
  }
}

// let count = 0
// const test = document.querySelector('.btn-text')
// const counter = document.querySelector('#counter')
// test.addEventListener('click', ()=>{
//     count+=1
//     counter.innerText = count
//     console.log('click = ', count)
// })

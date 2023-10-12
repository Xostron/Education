const btnOpen = document.querySelector('#hdlOpen')
const btnClose = document.querySelector('#hdlClose')
const modal = document.querySelector('.modal')

btnOpen.addEventListener('click', openModal)
btnClose.addEventListener('click', closeModal)

function openModal() {
	console.log('open!')
	modal.classList.remove('hide')
}

function closeModal() {
	console.log('close!')
	modal.classList.add('hide')
}

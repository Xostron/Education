const modal = document.querySelector(".wrapper");
const input = modal.querySelector("#gameSession");
const btnOk = modal.querySelector(".ok");
const btnCancel = modal.querySelector(".cancel");
const btnOpen = document.querySelector("#open");

btnOk.addEventListener("click", hndlOk);
btnCancel.addEventListener("click", hndlCancel);
btnOpen.addEventListener("click", onOffModal);
modal.addEventListener("click", hndlClose);

function hndlOk() {
	console.log("OK = ", input.value);
	onOffModal();
	//   setTimeout(alert(`Хммм = ${input.value}`),0)
}
function hndlCancel() {
	console.log("Cancel = ", input.value);
	onOffModal();
}

function hndlClose(e) {
	console.log("close = ", e.target, e.currentTarget);
	if (e.target === e.currentTarget) onOffModal();
}

function onOffModal() {
	modal.classList.length === 1
		? modal.classList.add("hidden")
		: modal.classList.remove("hidden");
	input.value = "";
}

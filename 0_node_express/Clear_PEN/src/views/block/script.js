document.addEventListener('DOMContentLoaded', _ => {
		// window.opener.prin(true, 'Закройте окно предварительного просмотра печати')
		setTimeout(() => {
			window.print()
		}, 100);
})
// window.onafterprint = function(){
// 	console.log("Printing completed...");
// 	console.log('window', window)
// 	setTimeout(() => {
// 		window.opener.prin(false)
// 	}, 10);
// }
// window.onbeforeunload  = function() {
// 	window.close()
// 	setTimeout(() => {
// 		window.opener.prin(false)
// 	}, 100);
// }

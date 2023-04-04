const labelForm = document.querySelector("#label-file");
const inFile = document.querySelector("#file");
const btnSend1 = document.querySelector("#btn1");
const btnSend2 = document.querySelector("#btn2");


const formData = new FormData();


inFile.addEventListener("change", (event) => {

//   formData.set('image', event.target.files)

  const listFiles = Object.values(event.target.files);
  labelForm.innerText = "";
  listFiles.forEach((val) => {
    labelForm.innerText += val.name + "\n";
  });

for (const file of event.target.files) {
    formData.append('image', file)
}

});

btnSend1.addEventListener("click", (event) => {
  formData.set('msg1','Отработка кнопки 1')
  formData.set('msg2','Files - Duna')
  console.log("formData = ", formData);
  fetch("/api/btn1", {
    method: "POST",
    // headers: { "content-type": "application/json" },
    // headers: { "content-type": "multipart/form-data" },
    body: formData
    // body: JSON.stringify({msg:'Xostron отработка кнопки 1',file}),
  })
    .then((res) => res.json())
    .then(console.log);
});

btnSend2.addEventListener("click", (event) => {

    fetch("/api/btn2", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({msg:'Xostron отработка кнопки 2'}),
    })
      .then((res) => res.json())
      .then(console.log);
  });
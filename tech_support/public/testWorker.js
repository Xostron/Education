
this.onmessage = (e) => {
  console.log("Данные получены в Worker ", e.data);
  const result = "test worker data";
  this.postMessage(result);
};


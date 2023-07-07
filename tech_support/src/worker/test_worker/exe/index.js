// worker - исполняется браузером в отдельном потоке

const workercode = () => {
  onmessage = (e) => {
    console.log("Данные от react", e.data);
    const result = "Worker: hi react";
    postMessage(result);
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;

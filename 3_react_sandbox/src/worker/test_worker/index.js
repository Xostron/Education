// worker - код исполняемый браузером в отдельном потоке
import worker_script from "./exe/index.js";

// инициализация worker на клиенте React
function create(data) {
  if ("Worker" in window) {
    let worker = new Worker(worker_script);

    worker.onmessage = (e) => {
      console.log("Данные от Worker ", e.data);
    };

    worker.postMessage(data);

    worker.onerror = (err) => {
      console.log("Ошибка Worker ", err);
    };

    console.log("testWorker создан: ", worker);
    return worker;
  }
  console.log("Worker не поддерживается вашим браузером");
  return null;
}

export default create;

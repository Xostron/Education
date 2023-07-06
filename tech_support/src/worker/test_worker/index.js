import exe from './exe/index'

function init() {
  if ("Worker" in window) {
    let worker = new Worker(exe);
    worker.onmessage=(e) => {
      console.log("Данные от Worker ", e.data);
    }

    worker.onerror=(err) => {
      console.log("Ошибка Worker ", err);
    }
    console.log("testWorker создан: ", worker);
    return worker;
  }
  console.log("Worker не поддерживается вашим браузером");
  return null;
}

function post(obj, worker) {
  console.log("Данные в Worker");
  worker.postMessage(JSON.stringify(obj));
}

export {post, init};

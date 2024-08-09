import { provide, ref } from "vue";

export function useApiRequest(provideValues = true) {
  const response = ref();
  const pending = ref(false);
  const error = ref("");

  if (provideValues) {
    provide("pending", pending);
    provide("error", error);
    provide("formError", error);
  }

  function send(
    request = (f) => f,
    cb = (f) => f,
    remove = false,
    beforeResolve = false) {
    if (typeof request != "function")
      return console.error("can not be called. not a function");

    pending.value = true;
    error.value = "";

    if (remove) {
      response.value = null;
    }

    try {
      request().then((res) => {

        if(beforeResolve) cb(res)

        // setTimeout(() => {
          pending.value = false;
          if (!(typeof cb == "function")) return;
          if (res?.success) {
            response.value = res.data;
          } else {
            error.value = res?.error;
            response.value = res?.data;
          }
          cb(res);
        // }, 0);
      });
    } catch (err) {
      console.error(err)
      pending.value = false;
      error.value = err.message;
    }
  }

  return {
    response,
    send,
    pending,
    error,
  };
}

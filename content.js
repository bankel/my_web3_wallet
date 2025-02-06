window.ethereum = {
    request: async ({ method, params }) => {
      return new Promise((resolve, reject) => {
        window.postMessage({ type: "WEB3_REQUEST", method, params }, "*");
  
        window.addEventListener("message", (event) => {
          if (event.data.type === "WEB3_RESPONSE") {
            resolve(event.data.result);
          }
        });
      });
    }
  };
  
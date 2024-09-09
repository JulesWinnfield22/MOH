//const base = import.meta.env?.v_BASE_SOCKET_URL;
//const socket = new SockJS(`${base}/socket`);

//const client = Stomp.over(socket);
//console.log(client);

//export const useSocket = () => {
  
//	function subscribe(name, cb) {
//    if (!client.connected) return console.log('You are Disconnected');

//    client.subscribe(name, cb);
//  }

//  function send(name, message) {
//    console.log("%cmessage", "color:green")
//    client.send(name, {}, message)
//  }

//	async function unSub() {
//		return new Promise((res) => {
//			Object.keys((client?.subscriptions || {})).forEach(el => {
//				client.unsubscribe(el)
//			})
//			res()
//		})
//	}

//  async function connect() {
//    return new Promise((res, rej) => {
//      if(client?.connected) return res({client})
//      console.log('connecting', client.connected);
//        client.connect(
//          {},
//          function (frame) { 	
//            res({client, frame});
//            console.log('connected ', client.connected);
//            // Do something, all subscribes must be done is this callback
//            // This is needed because this will be executed after a (re)connect
//          },
//          function (error) {
//            console.error('Connection error: ' + error);
//            rej(error);
//          }
//        );
//    });
//  }

//  return {
//    connect,
//    subscribe,
//		client,
//		unSub,
//    send
//  };
//};

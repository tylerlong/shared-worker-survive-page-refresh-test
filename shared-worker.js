let timestamp = new Date().toISOString();
let popupPort = null;
const ports = new Set();

self.onconnect = (event) => {
    const port = event.ports[0];

    port.onmessage = (messageEvent) => {
      if(messageEvent.data === 'index.html') {
        ports.add(port);
        if(popupPort && ports.size > 1) {
          popupPort.postMessage('close');
          popupPort = null;
        }
        port.postMessage(`timestamp: ${timestamp}`);
        if(ports.size === 1 && !popupPort) {
          port.postMessage('open-popup');
        }
      } else if(messageEvent.data === 'popup.html') {
        if(popupPort) {
          popupPort.postMessage('close');
        }
        popupPort = port;
      }
    };

    port.onclose = () => {
      if(popupPort === port) {
        popupPort = null;
      } else {
        ports.delete(port);
      }
      if(ports.size === 1 && !popupPort) {
        ports.values().next().value.postMessage('open-popup');
      }
    };
};

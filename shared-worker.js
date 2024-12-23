let connectionCount = 0;

self.onconnect = (event) => {
    const port = event.ports[0];
    connectionCount++;

    port.postMessage(`Connected. Current connection count: ${connectionCount}`);

    port.onmessage = (messageEvent) => {
        if (messageEvent.data === 'get-count') {
            port.postMessage(`Current connection count: ${connectionCount}`);
        }
    };
};

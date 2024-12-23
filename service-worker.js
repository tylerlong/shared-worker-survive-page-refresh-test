self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
  console.log('Service Worker activated');
});

// Keep Shared Worker alive with a hidden iframe
async function keepSharedWorkerAlive() {
  const allClients = await self.clients.matchAll();
  if (allClients.length === 0) {
      console.log('Creating hidden iframe to keep Shared Worker alive');
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = '/hidden-client.html'; // A minimal HTML file that connects to the Shared Worker
      document.body.appendChild(iframe);
  }
}

keepSharedWorkerAlive();

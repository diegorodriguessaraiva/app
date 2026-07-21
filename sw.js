/* Service worker da Minha Agenda Escolar.
   Foco em notificações (não faz cache, para o app sempre carregar a versão mais nova). */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// Handler de fetch vazio: apenas para o app ser "instalável"; sempre usa a rede.
self.addEventListener('fetch', () => {});

// Ao tocar na notificação, foca (ou abre) o app.
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});

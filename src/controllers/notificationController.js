const store = require('../services/notificationStore');

function listNotifications(req, res, url) {
  const userId = url.searchParams.get('userId') || 'user-1';
  const data = store.listByUser(userId);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ data }));
}

function markNotificationRead(req, res, id) {
  const updated = store.markAsRead(id);
  if (!updated) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Notifikasi tidak ditemukan' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ data: updated }));
}

module.exports = { listNotifications, markNotificationRead };

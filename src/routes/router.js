const { listNotifications, markNotificationRead } = require('../controllers/notificationController');
const { getPreferences, updatePreferences } = require('../controllers/preferenceController');

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
}

async function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET' && url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (req.method === 'GET' && url.pathname === '/notifications') {
    return listNotifications(req, res, url);
  }

  if (req.method === 'PATCH' && url.pathname.startsWith('/notifications/')) {
    req.body = await parseJsonBody(req).catch(() => null);
    if (!req.body) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Body JSON tidak valid' }));
      return;
    }

    return markNotificationRead(req, res, url.pathname.split('/')[2]);
  }

  if (req.method === 'GET' && url.pathname === '/notification-preferences') {
    return getPreferences(req, res);
  }

  if (req.method === 'PUT' && url.pathname === '/notification-preferences') {
    req.body = await parseJsonBody(req).catch(() => null);
    if (!req.body) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Body JSON tidak valid' }));
      return;
    }

    return updatePreferences(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Endpoint tidak ditemukan' }));
}

module.exports = { handleRequest };

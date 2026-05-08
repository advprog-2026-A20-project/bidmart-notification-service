const store = require('../services/notificationStore');

function getPreferences(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ data: store.getPreference() }));
}

function updatePreferences(req, res) {
  const allowed = ['email', 'push', 'realtime'];
  const payload = {};

  for (const key of allowed) {
    if (typeof req.body[key] === 'boolean') {
      payload[key] = req.body[key];
    }
  }

  const updated = store.updatePreference(payload);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ data: updated }));
}

module.exports = { getPreferences, updatePreferences };

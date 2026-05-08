const notifications = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'BidPlaced',
    message: 'Bid kamu sudah diterima.',
    read: false,
    createdAt: new Date().toISOString()
  }
];

const preferences = {
  userId: 'user-1',
  email: true,
  push: false,
  realtime: true
};

function listByUser(userId) {
  return notifications.filter((n) => n.userId === userId);
}

function markAsRead(id) {
  const target = notifications.find((n) => n.id === id);
  if (!target) return null;
  target.read = true;
  return target;
}

function getPreference() {
  return preferences;
}

function updatePreference(payload) {
  Object.assign(preferences, payload);
  return preferences;
}

module.exports = {
  listByUser,
  markAsRead,
  getPreference,
  updatePreference
};

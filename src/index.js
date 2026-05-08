const http = require('http');
const { handleRequest } = require('./routes/router');

const PORT = process.env.PORT || 8083;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`bidmart-notification-service berjalan di port ${PORT}`);
});

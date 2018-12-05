const http = require('http');
const app = require('./app');

let httpPort = process.env.HTTP_PORT || 3000;
let httpHost = process.env.HTTP_INTERFACE || 'localhost';


const server = http.createServer(app);

server.listen(httpPort, httpHost, function (err) {
 if (err) {
  return console.error(err);
 }

 console.info('Listening at http://%s:%s', httpHost, httpPort);
 process.on('uncaughtException', err => console.error(err));
});
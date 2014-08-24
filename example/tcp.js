// start a server: node -e "require('net').createServer(function(c){ c.pipe(process.stdout); }).listen(8008, console.log.bind(console));"
var Client = require('..').Client;

var c = new Client({
  host: 'localhost',
  port: 8008,
  type: 'tcp'
});
var i = 0;
function send() {
  setTimeout(function() {
    var msg = {date: new Date(), attempt: ++i};
    c.send(msg);
    send();
  }, Math.round(Math.random() * 10000));
}

send();

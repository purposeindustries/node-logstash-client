// start a server: node -e "require('dgram').createSocket('udp4').on('message', function(m){console.log(m + ''); }).bind(8008)"
var Client = require('..').Client;

var c = new Client({
  host: 'localhost',
  port: 8008,
  type: 'udp'
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

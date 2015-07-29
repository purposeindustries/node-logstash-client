'use strict';
var reconnect = require('reconnect-net');
var Transport = require('./transport');
var debug = require('debug')('logstash:transport:tcp');
var inherits = require('util').inherits;

function TCPTransport(options) {
  Transport.call(this, options);
  debug('new instance of TCPTransport');
}

inherits(TCPTransport, Transport);

TCPTransport.prototype.connect = function connect() {
  debug('connecting to %s:%s', this.host, this.port);
  this.reconnect = reconnect(function onConnected(socket) {
    this.socket = socket;
    this.connected = true;
    this.dequeue();
  }.bind(this)).connect({
    port: this.port,
    host:this.host
  });

  this.reconnect
    .on('disconnect', function() {
      debug('%s:%s disconnected', this.host, this.port);
      this.connected = null;
    }.bind(this))
    .on('reconnect', function(n) {
      debug('%s:%s is trying to reconnect for %th', this.host, this.port, n);
    }.bind(this));
};

TCPTransport.prototype._send = function send(message, cb) {
  this.socket.write(message + "\n", cb);
};

TCPTransport.prototype.close = function() {
  this.reconnect.disconnect();
  this.socket = null;
};

module.exports = TCPTransport;
'use strict';
var dgram = require('dgram');
var Transport = require('./transport');
var debug = require('debug')('logstash:transport:udp');
var inherits = require('util').inherits;

function UDPTransport(options) {
  Transport.call(this, options);
  debug('new instance of UDPTransport');
}

inherits(UDPTransport, Transport);

UDPTransport.prototype.connect = function connect() {
  debug('creating udp socket');
  this.socket = dgram.createSocket('udp4');
  this.connected = true;
};

UDPTransport.prototype._send = function send(message, cb) {
  debug('sending to %s:%s', this.host, this.port);
  var buffer = new Buffer(message);
  this.socket.send(buffer, 0, buffer.length, this.port, this.host, cb);
};

UDPTransport.prototype.close = function() {
  this.socket.close();
  this.socket = null;
};

module.exports = UDPTransport;
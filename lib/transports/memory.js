'use strict';
var Transport = require('./transport');
var debug = require('debug')('logstash:transport:udp');
var inherits = require('util').inherits;

function MemoryTransport(options) {
  Transport.call(this, options);
  debug('new instance of MemoryTransport');
}

inherits(MemoryTransport, Transport);

MemoryTransport.prototype.connect = function connect() {
  debug('creating messages array');
  this.messages = [];
  this.connected = true;
};

MemoryTransport.prototype._send = function send(message, cb) {
  debug('storing message');
  this.messages.push(message);
  if (cb) {
    cb();
  }
};

MemoryTransport.prototype.close = function() {
  this.messages = [];
};

module.exports = MemoryTransport;
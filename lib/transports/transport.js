'use strict';

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var debug = require('debug')('logstash:transport');

function Transport(options) {
  EventEmitter.apply(this, arguments);
  options = options || {};
  this.queue = [];
  this.host = options.host;
  this.port = options.port;
  this.options = options;
}

inherits(Transport, EventEmitter);

Transport.prototype.send = function send(message, cb) {
  if (this.connected) {
    debug('sending message asap');
    return this._send(message, cb);
  }
  debug('queueing message');
  this.queue.push({
    message: message,
    cb: cb
  });

  if(this.queue.length > this.options.maxQueueSize) {
    this.queue.shift();
  }
};

Transport.prototype._send = function _send() {
  throw new Error('_send should be implementend by transport');
};

Transport.prototype.dequeue = function dequeue() {
  debug('dequeuing %s messages', this.queue.length);
  while (this.queue.length) {
    var obj = this.queue.shift();
    this._send(obj.message, obj.cb);
  }
};

module.exports = Transport;

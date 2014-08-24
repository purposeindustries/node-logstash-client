'use strict';
var Transports = require('./transports');
var debug = require('debug')('logstash:client');

function Client(options) {

  if (!(this instanceof Client)) {
    process.stdout.write('not instanceof\n')
    return new Client(options);
  }

  options = options || {};

  if (!options || !~['tcp', 'udp', 'memory'].indexOf(options.type)) {
    throw new Error('options.type is required to be one of tcp, udp or memory');
  }

  this.type = options.type;
  this.format = options.format || this._format;

  debug('new client instance with type: %s', this.type);

  if (this.type === 'tcp') {
    this.transport = new (Transports.TCPTransport)(options);
  }
  else if (this.type === 'udp') {
    this.transport = new (Transports.UDPTransport)(options);
  }
  else if (this.type === 'memory') {
    this.transport = new (Transports.MemoryTransport)(options);
  }
  // useful for testing
  if (options.autoConnect !== false) {
    this.connect();
  }
}

Client.prototype.connect = function connect() {
  this.transport.connect();
}
Client.prototype.send = function send(message, cb) {
  this.transport.send(this.format(message), cb);
};

Client.prototype._format = function _format(message) {
  return JSON.stringify(message);
};

module.exports = Client;


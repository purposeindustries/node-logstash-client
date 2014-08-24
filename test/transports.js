'use strict';
var Transports = require('..').Transports;
var test = require('tap').test;

test('Offline support for transport', function(t) {
  var transport = new (Transports.Transport)();
  transport.send('foo');
  t.equal(transport.queue[0].message, 'foo', 'should store message');
  t.end();
});

test('Send messages if transport connected', function(t) {
  var transport = new (Transports.Transport)();
  transport.connected = true;
  transport._send = function(message) {
    t.equal(message, 'foo-bar', 'message should equal');
    t.end();
  };

  transport.send('foo-bar');
});
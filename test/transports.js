'use strict';
var Transports = require('..').Transports;
var test = require('tap').test;

test('Offline support for transport', function(t) {
  var transport = new (Transports.Transport)();
  transport.send('foo');
  t.equal(transport.queue[0].message, 'foo', 'should store message');
  t.end();
});

test('Maximum queue size when offline', function(t) {
  var transport = new (Transports.Transport)({maxQueueSize: 1});
  transport.send('foo');
  transport.send('foo1');
  transport.send('foo2');
  t.equal(transport.queue.length, 1, 'should not exceed maxQueueSize');
  t.equal(transport.queue[0].message, 'foo2', 'should store message');
  t.end();
});

test('Unlimited queue size when offline', function(t) {
  var transport = new (Transports.Transport)();
  for(var i = 0; i < 10000; i++) {
    transport.send('foo');
  }
  t.equal(transport.queue.length, 10000, 'should include all messages');
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

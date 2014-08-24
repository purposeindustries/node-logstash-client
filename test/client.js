'use strict';
var Client = require('..');
var test = require('tap').test;

test('Client ctor', function(t) {
  t.throws(function() {
    Client()
  }, 'should throw on empty object');
  t.end();
});

test('Client ctor', function(t) {
  t.throws(function() {
    Client({
      type: 'non-existent'
    }, 'should throw if type isnt tcp or udp or memory');
  });
  t.end();
});

test('Client should create new instance', function(t) {
  var client = Client({type: 'tcp', autoConnect: false});
  t.ok(client instanceof Client, 'without new client should instance of Client');
  console.log('ok');
  t.end();
});

test('Formatting', function(t) {
  var client = Client({type: 'memory'});
  var obj = [{
    'foo': 'bar'
  }];
  var str = '[{"foo":"bar"}]';

  t.equal(client.format(obj), str, 'format should JSON stringify');
  t.end();
});
test('custom formatting', function(t) {
  var client = Client({type: 'memory', format: function() {
    return 'foo';
  }});

  t.equal(client.format({
    'bar': 'pi'
  }), 'foo', 'should use custom formatting');
  t.end();
});
# logstash-client [![Build Status](https://travis-ci.org/purposeindustries/node-logstash-client.svg)](https://travis-ci.org/purposeindustries/node-logstash-client) [![Coverage Status](https://coveralls.io/repos/purposeindustries/node-logstash-client/badge.png)](https://coveralls.io/r/purposeindustries/node-logstash-client)

General purpose logstash with multiple transport support

## Features

* tcp uses [juliangruber](https://github.com/juliangruber)'s [reconnect-net](https://github.com/juliangruber/reconnect-net) for handling reconnection
* logging library independent (there are some logstash clients for winston, bunyan etc)

## TODOS

* [x] TCP Transport
* [x] UDP Transport
* [x] Memory Transport (for testing)
* [ ] AMQP Transport
* [ ] Codec support

## Example

```js
var Logstash = require('logstash-client');

var logstash = new Logstash({
  type: 'udp', // udp, tcp, memory
  host: 'logstash.example.org',
  port: 13333
});
logstash.send(message [, callback]);
```

## API

### Constructor

Takes the following parameters:
* **type**: type of connection, currently supported tcp, udp, memory
* **host**: remote hostname
* **port**: remote port
* **format** (optional): formatter function (by default the message gets JSON.stringified)
* **maxQueueSize** (optional): Restricts the amount of messages queued when there is no connection. If not specified the queue is not limited in size.

Example:

```js
new Client({
  type: 'tcp',
  host: 'logstash.example.org',
  port: 8099,
  format: function(message) {
    message.formattedAt = new Date();
    message.password = '!FILTERED!';
    return JSON.stringify(message, null, 2);
  },
  maxQueueSize: 1000
});
```

### Client#send

Takes the following parameters:

* **message**: an object what you are trying to send to your logstash instance
* **callback** (optional): a function called when the message has been sent

Example:

```js
var client = new Client({
  type: 'tcp',
  host: 'example.org',
  port: 1337
});
client.send({
  '@timestamp': new Date(),
  'message': 'Important',
  'level': 'error'
});
```

## License

MIT

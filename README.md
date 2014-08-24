# logstash-client [![Build Status](https://travis-ci.org/purposeindustries/node-logstash-client.svg)](https://travis-ci.org/purposeindustries/node-logstash-client)

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
  type: 'udp' // udp, tcp, memory
  host: 'logstash.example.org',
  port: 13333
});
logstash.send(message [, callback]);
``` 

## API

```js
new Client({
  type: 'type of connection, currently supported tcp, udp, memory',
  host: 'target host',
  port: 'target port',
  format: '<custom formatter function>'
});
```
## License

MIT
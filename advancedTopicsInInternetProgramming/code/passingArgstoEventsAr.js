var events = require('events');
var eventEmitter = new events.EventEmitter();
eventEmitter.on('event', (a, b) => {
  console.log(a, b, this);
  // Prints: a b {}
});
//Fire the 'event' event:

eventEmitter.emit('event', 'a', 'b');




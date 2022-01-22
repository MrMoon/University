var fs = require('fs');

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
 
  console.log('Saved!');
});
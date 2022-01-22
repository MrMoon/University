var fs = require('fs');

fs.open('mynewfile2.txt', 'w', function () {
 
  console.log('Saved!');
});
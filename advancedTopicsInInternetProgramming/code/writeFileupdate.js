var fs = require('fs');

//Replace the file with a new one:
fs.writeFile('mynewfile1.txt', 'This is my text.',{flag:'a+' }, function () {

  console.log('Replaced!');
});

const http = require('http'); //step2
//var dt = require('./myfirstmodule');

const port=8000; //step3
http.createServer(function (req, res) { //step4
  res.writeHead(200, {'Content-Type': 'text/html'});
  //res.write("The date and time are currently: " + dt.myDateTime());
  res.end('Hello World!');
}).listen(port);

//The code tells the computer to write "Hello World!" if anyone (e.g. a web browser) tries to access your computer on port 8080.
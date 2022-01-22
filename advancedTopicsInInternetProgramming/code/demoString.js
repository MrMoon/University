var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var q = url.parse(req.url, true);


var h= url.parse(req.url,true).host //returns localhost:8080
var pn =url.parse(req.url,true).pathname //returns the path 
var qs= url.parse(req.url,true).search //returns ?year=2017&month=July
  
  
 // var txt = JSON.stringify(q);
 
  //res.end(txt);
  var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
  console.log(qdata.month)
}).listen(8080);

//localhost:8080/default.htm?year=2017&month=february';
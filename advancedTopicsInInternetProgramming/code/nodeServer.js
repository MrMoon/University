const http = require('http'); 
const port=8000; 


const server=http.createServer(function (req, res) {
  res.writeHead(200,{'Content-Type':'text/html'})
  res.write("OK");
	
  res.end()
  })
 


server.listen(8000);

var http = require('http')
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('hello world\n');
}).listen(7112, '127.0.0.1');

console.log('Server running')
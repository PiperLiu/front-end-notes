const http = require('http')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  response.end('123')

}).listen(8887)

console.log('server listening on 8887')
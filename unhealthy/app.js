const http = require('http');
const os = require('os');

console.log("Server starting");

var requestCount = 0;

var handler = function(request, response) {
    requestCount++;
    console.log("Received request from " + request.connection.remoteAddress + ", requestCount:" + requestCount);
    if (requestCount > 5) {
        console.log("Health check failure, restart needed");
        response.writeHead(500);
        response.end("Health check failure, restart needed");
        return;
    }
    response.writeHead(200);
    response.end("You've hit " + os.hostname() + "\n");
};

var www = http.createServer(handler);
www.listen(5000);
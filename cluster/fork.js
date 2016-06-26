// fork集群 共享PORT

var cluster = require('cluster');
var os = require('os');
var http = require('http');

if (cluster.isMaster) {
    for (var i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died');
    });
} else {
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("Hello KingDomPan, My Process's id is " + process.pid);
    }).listen(8000);
}

// 主进程与子进程相互通信, 子进程处理请求, 主进程统计所有的请求数

var cluster = require('cluster');
var os = require('os');
var http = require('http');

var cpus = os.cpus().length;

var workers = {};
var requests = 0;

if (cluster.isMaster) {
    for (var i = 0; i < cpus; i++) {
        workers[i] = cluster.fork();
        (function(index) {
            workers[index].on('message', function(message) { // 监听来自子进程的消息
                if (message.cmd == 'incrementRequestTotal') {
                    requests++;
                    for (var j = 0; j < cpus; j++) {
                        workers[j].send({ // 将新的请求总数发送给所有工人
                            cmd: 'updateOfRequestTotal',
                            requests: requests
                        });
                    }
                }
            });
        })(i);
    }
    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died');
    });
} else {
    process.on('message', function(message) { // 监听来自主进程的消息
        if (message.cmd === 'updateOfRequestTotal') {
            requests = message.requests; // 用主进程的消息更新请求数量
        }
    });
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("Worker in process " + process.pid + ', says cluster has responsed to ' + requests + ' requests');
        process.send({
            cmd: 'incrementRequestTotal'
        })
    }).listen(8000);
}

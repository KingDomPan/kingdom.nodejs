// process.env 获取传递给进程的环境变量
var debug = process.env.DEBUG; // 只在只能node环境下有效 DEBUG=1 node xxx.js
var debugFn = undefined;
if (debug) {
    debugFn = function(data) {
        console.error(data);
    };
} else {
    debugFn = function() {};
}

debugFn('this is a debug message log');

// 进程间通信IPC-信号
// SIGINT 在按下ctrl+c时由shell发出, node的默认行为是杀掉进程, 但是可以由进程上的SIGINT的单利监听器覆盖
// SIGUSR1 收到这个信号, node会进入它内置的调试器
// SIGWINCH 在调整终端大小时由shell发出, node会重新设定process.stdout.rows和process.stdout.columns, 并发出resize事件
var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end('KingDomPan');
}).listen(8000);

process.on('SIGINT', function() {
    console.log('ctrl + c');
    server.close();
});

// 进程事件
// 进程退出之前执行的exit事件
//  处理程序退出前要完成的任务
//  该事件在事件循环停止后激发, 所以不能执行异步任务代码,
//  成功返回0)
// 有未处理错误被抛出时发生的uncaughtException
process.on('exit', function() {
    console.log('process exit');
});

// 没有此事件的话任何未捕获的异常都会拖垮此进程
process.on('uncaughtException', function(err) {
    // 使用此事件应该在回调中包含process.exit()方法. 否则会让程序处于不确定的状态中
    console.log('uncaughtException:', err.message);
    process.exit(); // 进程退出, 同时执行exit事件回调
});

// 直接指定抛出一个异常
// throw new Error('an uncaughtException error');

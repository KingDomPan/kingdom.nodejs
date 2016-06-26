// 使用TCP客户端实现类似netcat的命令

// 星际迷航的动画效果
// node tcpclient.js towel.blinkenlights.nl 23 
var net = require('net');

var host = process.argv[2];
var port = Number(process.argv[3]);

var socket = net.connect({
    host: host,
    port: port
});

socket.on('connect', function() { // 到服务器的连接建立好之后处理connect事件
    process.stdin.pipe(socket); // 将进程的标准输入传递给socket
    socket.pipe(process.stdout); // 将socket的标准输出传递给进程的stdout
    process.stdin.resume(); // 调用进程的resume方法开始读取数据
});

socket.on('end', function() {
    process.stdio.pause();
});

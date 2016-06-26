var net = require('net');

// 一个完整的简单的tcp服务端. 包含简单的异常和错误处理
net.createServer(function(socket) {
    console.log('client socket connect');
    socket.on('data', function(data) { // data事件会出现多次
        console.log('data event: ' + data); // 这是一个buffer类型的数据
    });
    socket.on('end', function() { // end事件在每个socket上只会出现一次 
        console.log('end event');
    });
    socket.on('close', function() { // close事件只会出现一次
        console.log('close event: socket client disconnected');
    });
    socket.on('error', function(e) { // 设定错误处理器以防止出现未捕获的异常
        console.log('error event: ', e);
    });
    socket.pipe(socket); // 直接使用流(pipe)的方式实现echo服务器的功能
}).listen(3737);

console.log('listen on 3737 port');

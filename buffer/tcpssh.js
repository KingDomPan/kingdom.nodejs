var net = require('net');

var socket = net.connect({ // 使用TCP协议连接某个主机的22端口(ssh进程)
    host: process.argv[2],
    port: 22
});

socket.setEncoding('utf8'); // 设置返回的数据使用Utf8进行解码
socket.once('data', function(data) {
    console.log('ssh server version: %s', data.trim());
    socket.end();
});

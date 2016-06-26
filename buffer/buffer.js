var b = new Buffer('121234869'); // 值作为文本字符放在内存中, 每个字符占一个字节

console.log(b); // <Buffer 31 32 31 32 33 34 38 36 39>
console.log(b.length); // 9


// writeInt16LE() 较小的整数型
// writeUInt32LE() 无符号值
// writeInt32BE() 大尾数值
var bb = new Buffer(4);
bb.writeInt32LE(121234869, 0); // 值作为整数型放在内存中, 空间使用率提高一倍

console.log(bb); // <Buffer b5 e5 39 07>
console.log(bb.length); // 4


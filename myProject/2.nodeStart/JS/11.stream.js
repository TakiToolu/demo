
var fs=require('fs');
var rs=fs.createReadStream('./1.txt',{encoding:'utf-8'});
var out=fs.createWriteStream('../2.txt',encodeURI('utf-8'));
// rs.setEncoding('utf-8');
/*
rs.pause();
rs.on('data',function (data) {//data默认是个buffer
    console.log(data);
});
setTimeout(function (){
    rs.resume();
},1000);
rs.on('end',function () {
    console.log('文件读取完毕');

});
rs.on('error',function () {
    console.log('文件读取失败');

});

*/


rs.on('data',function (data) {
    //WRITE的返回值：缓存区未满返回true；已满返回false；
    var flag=out.write(data);
    if(!flag){
        rs.pause();
    }
});
out.on('drain',function () {
    out.resume();
});
rs.on('end',function () {
    out.end();
})
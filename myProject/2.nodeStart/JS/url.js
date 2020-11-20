var path=require('path');
var url=require('2.nodeStart/JS/url');
var http=require('http');
var fs=require('fs');

/*

var str="https://blog.csdn.net/kleychan/article/details/aaa.html?age=12&sex=woman#hashzhi";
var a=url.parse(str);
console.log(a);
console.log(path.basename(a.pathname));
console.log(path.extname(a.pathname));
console.log(path.dirname(a.pathname));
console.log(path.isAbsolute(a.pathname));
console.log(path.resolve('.'));
console.log(path.resolve('..'));
console.log(path.resolve('/'));
console.log(path.resolve('a'));
*/


// varstr1="http://192.168.31.90/kleychan/article/details/taiji.html?age=12&sex=woman#hashzhi"
// varstr1="http://localhost/kleychan/article/details/taiji.html?age=12&sex=woman#hashzhi"

/*
var server=http.createServer(function () {
    console.log("新建了个服务");
});
*/

var server=http.createServer(function (request,response) {

    console.log(request);
    var obj=url.parse(request.url);
    var pathname=obj.pathname,basename=path.basename(pathname);
    console.log("新建了个服务");

    if(basename==='taiji.html'){
        var con=fs.readFileSync('../html/taiji.html',"utf-8");
        // "判断request中条件成立"
        //var aa="反馈测试"
        response.write(con);
        response.end();
    }


});

server.listen(80,function(){
    console.log("正在监听80端口的请求");
});





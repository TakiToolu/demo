//创建服务的，运行于node环境中，服务器端的程序
var http=require("http");
var url=require("url");
var fs=require("fs");


//创建一个服务
var server1=http.createServer(function (request,response) {

    var obj = url.parse(request.url);
    var pathName = obj.pathname;
    console.log(pathName);
    //合并以下3块

    /*->前端路由（机制）：根据客户端请求的内容不一样，返回不同的内容
    * ->处理静态资源文件的请求（HTML、CSS、JS）【google根据请求文件类型对应进行相应格式的渲染，但IE不行，需人为tell】
    *1、MIME类型
    *  ->每一种资源文件都有自己的标识类型，
    *       例如：HTML文件的MIME类型是“text/html"；CSS的是”text、css“;TXT->“text/plain”
    *  ->浏览器会按照代码的MIME类型进行渲染
    * */
    var reg = /\.(HTML|JS|CSS|JSON|TXT|ICO|JPG|GIF|PNG|BMP)/i;
    if (reg.test(pathName)) {
        //获取请求文件的后缀名
        console.log("这里测试1");
        var suffix = reg.exec(pathName)[1].toUpperCase();
        //根据文件的后缀名获取到当前文件的类型MIME
        var suffixMIME = "text/plain";
        switch (suffix) {
            case "HTML":
                suffixMIME = "text/html";
                break;
            case "CSS":
                suffixMIME = "text/css";
                break;
            case "JS":
                suffixMIME = "text/javascript";
                break;
            case "JSON":
                suffixMIME = "application/jsion";
                break;
            case "ICO":
                suffixMIME = "image/vnd.microsoft.icon";
                break;
        }
        //按照指定文件读取代码,读取出的内容都是字符串格式的
        //若客户端请求的资源文件不存在，不加try catch服务会终止
        // 捕获异常信息，保证即使请求文件不存在，当前服务也不会停止
        try {
            var conFile = fs.readFileSync("." + pathName, "utf-8");
            //重写相应头信息：告诉客户端的浏览器我返回的内容是什么样的MIME类型
            //  并且返回内容格式是UTF-8编码的，返回的汉子就不会出现乱码
            response.writeHead(200, {'content-type': suffixMIME + ';charset=utf-8'});

            //服务端返回的内容应该也是字符串
            response.end(conFile);
        } catch (e) {
            response.writeHead(404, {'content-type': 'text/plain;charset=utf-8'});
            response.end("request file is not found!!~~");
        }
        /*
          try{
              con=fs.readFileSync("."+pathName,"utf-8");
              response.write(con);
              response.end();
          }catch (e) {
              response.end("找不到请求文件","utf-8");
          }
      */
        /*

            if(pathName==="/Index.html"){
                var con1=fs.readFileSync("./Index.html","utf-8");
                console.log("获取首页");
                response.write(con1);
                response.end();
            }
            if(pathName==="/CSS/Index.css"){
                var con2=fs.readFileSync("./CSS/Index.css","utf-8");
                console.log("获取首页样式");
                response.write(con2);
                response.end();
            }
            if(pathName==="/JS/Index.js"){
                var con3=fs.readFileSync("./JS/Index.js","utf-8");
                console.log("获取JS代码");
                response.write(con3);
                response.end();
            }
        */
    }
})
//为当前服务配置端口
server1.listen(123,function () {
    console.log("服务器正监听1234端口号");
});
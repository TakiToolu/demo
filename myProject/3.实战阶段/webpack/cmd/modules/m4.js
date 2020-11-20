define(function(require,exports,module){
    var msg='m4';
    //同步加载
    var m2 = require('./m2');
    m2();//按需加载时，加载这整个模块，期间执行了m2
    //异步加载，置于异步队列中，待主队列中的代码执行完成后再执行
    require.async('./m3',function(m3){
        m3.m3();
    })
    function fun(){
        console.log(m4);
    }
    exports.m4 = fun;
})
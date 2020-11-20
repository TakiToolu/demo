define(function(require, exports,module) {
    var m1 = require('./m1');
    m1.foo();

    var m4 = require ('./modules/m4');
    m4.m4();
    
});

//打印出顺序  m1、2、4、3
//执行：先打印m1，加载m4过程中，同步打印了m2，
//且将m3开启异步队列中，主线程继续执行打印m4，主线程打结束后不忙了，打印异步线程m3
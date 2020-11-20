function debounce(handler,delay) {
    var timer=null;
    return function () {
        var _self=this,_arg=arguments;
        clearTimeout(timer);
        timer=setTimeout(function () {
            //真正执行的功能
            handler.apply(_self,_arg);
        },delay);
    }
}
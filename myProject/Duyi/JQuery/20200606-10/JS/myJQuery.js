/*
* JQuery中元素的获取$
* */

/*
//实例：
    $('.wrapper ul li').css({width:100px,height:200px,backgroundColor:'red}});
    $('li[name="ZXX"]'.css({  }));


    window.onload =function () {
        console.log('window.onload;
    }
    //页面所有元素已经加载完成
    $(function () {
        console.log('DOMContentLoad');
    })
    $(document).ready(function () {
        onsole.log('DOMContentLoad');
    })

    //选择两个元素
    $('ul','.wrapper');
 */

//$ 返回对象（类数组）
//JQuery 库 封闭作用域

(function () {
    function jQuery(selector) {

        return new jQuery.prototype.init(selector);
    }

    jQuery.prototype.init=function (selector) {
        //返回this{}
        //选出dom 并且包装成jQuery对象 返回
        //console.log(selector);
        this.length=0;
        if(selector==null){
            return this;
        }
        if(typeof selector=='string' && selector.indexOf('.')!=-1){
            var dom = document.getElementsByClassName(selector.slice(1));
        }else if(typeof selector=='string'&& selector.indexOf('#')!=-1){
            var dom = document.getElementById(selector.slice(1));
           // dom.length=1;
          //  console.log(dom);
          //  console.log(selector);
          //  console.log(this);
        }
        //instanceof 关键字，测试是否是一个类
        if(selector instanceof Element || dom.length==undefined){
            this[0]= dom;
            this.length++;
        }else{
           // console.log(dom.length);
            for(var i=0;i<dom.length;i++){
                this[i]=dom[i];
                this.length++;
            }
          //  console.log(this);
        }
    }


    //.CSS()
    jQuery.prototype.css=function(config){
        //循环操作每一个dom
      // console.log(config);
       // console.log(config.length);
        for (var i = 0; i < this.length; i++) {
            //console.log(i);
            for (var attr in config) {
               // console.log(attr);
                this[i].style[attr]=config[attr];
            }
        }
        //链式操作
        return this;
    }
    jQuery.prototype.init.prototype=jQuery.prototype;
    window.$=window.jQuery=jQuery;

    //get()
    jQuery.prototype.get = function (num) {
        // if (num == null) {
        //     return [].slice.call(this, 0);
        // } else {
        //     iF(num>=0){
        //         return this[num];
        //     }else {
        //         return  this[num+this.length];
        //     }
        return num!=null?(num>=0?this[num]:this[num+this.length]):[].slice.call(this,0);
    }

    //链式操作——回退
    jQuery.prototype.pushback = function(dom) {
        if(dom.constructor != jQuery){
            dom=jQuery(dom);
        }
        dom.prevObject=this;
        return dom;
    }


    //.end()
    jQuery.prototype.end = function (){
        return this.prevObject;
    }

    //.add()
    jQuery.prototype.add = function(selector){
        var curObj=jQuery(selector);
       // console.log(selector);
       // console.log(curObj);
        var baseObj=this;
        //  console.log(baseObj);
        var newObj=jQuery();
        //jq中默认工具merge思想类似
        for (var i=0;i<curObj.length;i++){
            newObj[newObj.length++]=curObj[i];
        }
        for (var i=0;i<baseObj.length;i++){
            newObj[newObj.length++]=baseObj[i];
        }
       // console.log(newObj);
        //console.log(newObj.length);
        //newObj.prevObject=this;
        this.pushback(newObj);
        return newObj;
    }

    //myOn绑定自定义事件
    jQuery.prototype.myOn=function(type,handle){
        for (var i=0;i<this.length;i++){
            if(!this[i].cacheEvent){
                this[i].cacheEvent={};

            }
            if(!this[i].cacheEvent.type){
                this[i].cacheEvent[type] = [handle];
                //console.log(this[i].cacheEvent[type]);
                // console.log(handle);
                // console.log('test2');
            }else {
                this[i].cacheEvent[type].push[handle];
                // console.log('test3');
            }
        }
    }
    //trigger()触发自定义事件（含参数）
    jQuery.prototype.myTrigger = function (type){
        // console.log(arguments.length);
        // console.log(arguments);
        var params = arguments.length>1? [].slice.call(arguments,1):[];
        //console.log(params);
        var self=this;
        for (var i = 0; i < this.length; i++) {
           if(this[i].cacheEvent[type]){
               this[i].cacheEvent[type].forEach(function (ele,index) {
                   ele.apply(self,params);
               })
           }

        }
    }

    jQuery.prototype.myQueue = function(){
        var queueObj = this;
        var queueName =arguments[0] || 'fx';
        var addFunc = arguments[1] || null;
        var len=arguments.length;
        //获取队列
        if(len==1){
            return queueObj[0][queueName];
        }
        //添加队列 queue dom {chain:}
        queueObj[0][queueName]==undefined? queueObj[0][queueName]=[addFunc]:queueObj[0][queueName].push(addFunc);
        return  this;
    }
    jQuery.prototype.myDequeue = function(){
        var self=this;
        var queueName = arguments[0] || 'fx';
        var queueArr =this.myQueue(queueName);//获取当前带有‘chain’属性值（且为数组类型）dom的
        var currFunc=queueArr.shift();//删除当前数组的第一项，并返回。相当于出队列
        if(currFunc==undefined){
            return ;
        }
        var next = function () {
            self.myDequeue(queueName);//this叠加使用了，
        }
        currFunc(next);
        return this;
    }

    jQuery.prototype.myDelay = function (duration) {
        var queueArr =this[0]['fx'];
        console.log('this :'+this);
        console.log('queueArr: '+queueArr);
        queueArr.push(function (next) {
            setTimeout(function () {
                next();
            },duration);
        })
        return this;
    }
//思想，另有getstyle、moveto函数未添加
    jQuery.prototype.myAnimate =function (json,callback) {
        var len = this.length;
        var self=this;

        var baseFunc = function (next) {
            var times=0;
            for (var i = 0; i < len; i++) {
                times++;
                if(times==len){
                    callback && callback();
                    next();
                }
            }
        }
        this.myQueue('fx',baseFunc);
        if(this.myQueue('fx').length==1){
            this.myQueue('fx');
        }

        return this;
    }



    //eq()
    jQuery.prototype.eq = function (num) {

        var dom= num!=null?(num>=0?this[num]:this[num+this.length]):[].slice.call(this,0);
        this.pushback(dom);

    }

    //callback()
    jQuery.myCallbacks = function () {
        //参数 once、 memory、once Memory、 null
        var options =arguments[0] || '';
        //通过add来加入的方法
        var list =[];

        //索引记录，当前要执行的函数的索引
        var fireIndex =0;
        //标记：记录if被fire过
        var  fired = false;
        //全局实参列表
        var arg=[];

        var fire =function () {
            for (fireIndex; fireIndex < list.length; fireIndex++) {
                list[fireIndex].apply(window,arg);
            if(options.indexOf('once')!=-1){
                list=[];
                fireIndex=0;
            }
            }

        }

        return {
            add: function (func) {
                list.push(func);
                if(options.indexOf('memory')!=-1&& fired){
                    fire();
                }
                return this;
            },
            fire : function () {
                fireIndex=0;
                arg=arguments;
                fire();
            }

        }

    }


    //Deferred()
    jQuery.myDeferred = function () {
        //callback
        //stackback
        //done resolve   fail reject  progress notify
        var arrCallbacks = [
            [
                jQuery.myCallbacks('once memory'),'done','resolve'
            ],[
                jQuery.myCallbacks('once memory'),'fail','reject'
            ],[
                jQuery.myCallbacks('memory'),'progress','notify'
            ]
        ];
        //记录当前状态，外界
        var pendding=true;
        var deferred ={};
        for (var i = 0; i < arrCallbacks.length; i++) {

            //deferred['done']=function(){}
            //deferred ['fail']=function(){}
            //deferred ['progress']=function(){}
            deferred[arrCallbacks[i][1]]=(function(index) {
                return function (func) {
                    arrCallbacks[index][1].add(func);
                }
            })(i);

            //已经完全懵了

            //触发
            //deferred['resolve']=function(){}
            //deferred ['reject']=function(){}
            //deferred ['notify']=function(){}
            deferred[arrCallbacks[i][2]]=(function(index) {
                return function () {
                    var args=arguments;
                    if(pendding){
                        arrCallbacks[index][0].fire.apply(window,args);
                        arrCallbacks[index][2]=='resolve'||arrCallbacks[index][2]=='reject'?pendding=false:'';
                    }
                }
            })(i);
            }
        return deferred;
    }
})();



















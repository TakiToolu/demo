~function(pro){
    pro.formatTime=function (template) {
        template=template||'{0}年{1}月{2}日 {3}时{4}分{5}秒';
        var ary=this.match(/\d+/g);
        template=template.replace(/\{(\d)\}/g),function(){
            var n=arguments[1],
                val=ary[n]||'0';
            val<10?val='0'+val:null;
            return val;
        };

    }
}(String.prototype);
/*实验尚未通过
var str='2020-5-18 13:33:3';
console.log(str);
str.formatTime();
console.log(str);*/

~function (pro) {
    pro.queryURLParameter = function () {
        var obj = {},
            reg = /([^?=&#]+)(?:=([^?=&#]+)?)/g;
        this.replace(reg, function () {
            var key = arguments[1],
                value = arguments[2] || null;
            obj[key] = value;
        });
    }
}(String.prototype);

var url='http://www.javascriptpeixun.cn/?course=11&task=196#show';
console.log(url.queryURLParameter());

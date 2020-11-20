var str='2020-5-18 13:33:3';
/*
* 1，基于split按照空格将字符串拆成两部分
* 2，左边部分继续以split按照-拆分成三部分
* 3，又不安以split按照：拆分成三部分
* 4，需要的信息拼接（拼接时不足十位的补零）
* */
function addZero(val){
    return val<10?'0'+val:val;
}
/*扩展：ES6封装函数只能识别日期formatTime*/
//str.formatTime();
var arr=str.split(' ');
var arrLeft=arr[0].split('-'),
    arrRight=arr[1].split(':');
var month=addZero(arrLeft[1]),
    day=addZero(arrLeft[2]),
    hour=addZero(arrRight[0]),
    minute=addZero(arrRight[1]),
    second=addZero(arrRight[2]);
var result=month+'月'+day+'日'+hour+'时'+minute+'分'+second+'秒';

//正则表示
// str.split(/(?:-| |—:)/g);


console.log(str);

/*
* 截取？到#前或末尾
* 按&拆分
* 按=拆分
* */
var url='http://www.javascriptpeixun.cn/?course=11&task=196#show';
var indexAsk=url.indexOf('?'),
    indexWell=url.indexOf('#');
if(indexWell>-1){
    var str1=url.substring(indexAsk+1,indexWell);
}else{
    var str1=url.substring(indexAsk+1);
}

var arr1=str1.split('&'),obj={};
console.log(arr1+'a');
for (let i = 0; i < str1.length; i++) {
    var item=arr1[i];
    if(item){
        var itemAry=item.split('=');
    }
    var key=itemAry[0],value=itemAry[1];
    obj[key]=value;
    console.log(obj);
}
console.log(str1+'kkk');
console.log(obj);




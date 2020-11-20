

/*bianxie sum同功能累加函数*/
function mysum() {
    var total=null;
    for (var i = 0; i < arguments.length; i++) {
        var item = Number(arguments[i]);
        isNaN(item)? null :(total+=item);
    }
    return total;
}
//方法1
exports.mysum=mysum;

/*
//方法2
module.exports=mysum;
*/

/*

/!*高级写法*!/
let mysum1 =(...arg)=>{
    arg=arg.filter(item=>!isNaN(item));
    return eval(arg.join('+'));
}

var a=mysum1(10,'20','aa','30');
console.log(a);
*/

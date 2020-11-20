

/*bianxie sum同功能累加函数*/
function mysum() {
    var total=null;
    for (var i = 0; i < arguments.length; i++) {
        var item = Number(arguments[i]);
        isNaN(item)? null :(total+=item);
    }
    return total;
}

//方法2
module.exports=mysum;


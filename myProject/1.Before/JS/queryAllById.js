/*实现getElementById 同功能函数
* 思路：
* 1，线获取页面中all元素
* 2，便利每一项，判断id，保存至返回值
* */
function queryAllById(id){
    var nodeList=document.getElementsByClassName('*');
    var ary=[];
    for (let i = 0; i < nodeList.length; i++) {
        var item=nodeList[i];
        item.id==id?ary.push(item):null;

    }
    return ary;
}

//JS 中，默认会把元素的ID设置为变量，（不需要自己获取设置）
//且ID重复，获取的就是一个集合，包含所有iD项，不重复就是一个元素对象（类似Byid）获取的结果
console.log(Haha);
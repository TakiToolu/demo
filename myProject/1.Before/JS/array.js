/*数组去重
* 解决方案：
* 1、一次拿出数组中的每一项与后面的比较,不用拿最后一项
* 2、相等splice去掉后一项length-1
*以下我自己写出的
*若内层循环也采用郑旭的话，会存在数据塌陷的问题，就需要增加一步若删除一项，则j--
* */
var arr=[1,22,114,44,12,22,1,34,23,34,2,1,114,1,1,2];
/*我的想法
for (let i = 0; i < arr.length-1; i++) {

    for (let j = arr.length-1;j >i;j--) {
        if(arr[i]==arr[j]){
            arr.splice(j,1);
            if(arr[i]==2){
              //  console.log(arr);
            }
        }

    }
    */

//老师的想法，易用键值对
//item作为obj对象的属性，若用数组则站空间更多，还需还用indexOf函数

var obj={};
for (var i = 0; i <arr.length; i++) {
    var item=arr[i];
    if(typeof obj[item] !=='undefined'){
        arr.splice(i--,1);//这里i--解决数组塌陷问题
        /*直接删除想要的
        * 将最后一项的值替换到当前重复的值，在去掉最后一个值，会造成数组顺序打乱
        */

       /* arr[i]=arr[arr.length-1];
        arr.length--;
        i--;*/


        /*
        * 最简单粗暴的解决方案,一条语句,此时set输出为去重后数组
        * new Set(arr);
        * */
        continue;
    }
    else{
        obj[item]=item;
    }

}



console.log(arr);
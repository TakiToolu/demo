/*
* 【思路】
*   1、给all的li绑定点击事件，当点击任何一个li时，都做第二步操作
*   2、线让all的li&&div的样式类都为空，在让点击时li和对应的div有active的样式类
* **/

var tabBox=document.getElementById('tabBox');
var boxList=tabBox.getElementsByTagName('li');
var divList=tabBox.getElementsByTagName('div');
/*原方法
for(var i=0;i<boxList.length;i++){
    boxList[i]['zxxIndex']=i;
    boxList[i].onclick=function (){//绑定时没执行

        changTab(this.zxxIndex);//this表示当前点击的对象
    }
}
*/
/*
其他方法1
for(let i=0;i<boxList.length;i++){
    boxList[i].onclick=function (){//绑定时没执行
        changTab(i);//this表示当前点击的对象
    }
}

方法2
for(var i=0;i<boxList.length;i++){
    ~function (){
        boxList[i].onclick=function (){//绑定时没执行
            changTab(i);//this表示当前点击的对象
        }
    }
}


方法3
for(let i=0;i<boxList.length;i++){
    boxList[i].onclick=function (i) {
        return function () {
            changTab(i);
        }
    }(i);
}
*/


/*错误方法，先绑定时，方法未执行，当点击时i已经自增为3，
for(var i=0;i<boxList.length;i++){
    boxList[i].onclick=function (){
        alert(i);
        changTab(i);//此时的不是一个方法，没执行
    }
}
以下测试单个绑定效果正确
boxList[0].onclick=function (){
    changTab(0);
}
boxList[1].onclick=function (){
    changTab(1);
}
boxList[2].onclick=function (){
    changTab(2);
}*/

function changTab(n) {
    for (var i = 0; i < boxList.length; i++) {
        boxList[i].className='';
        divList[i].className='';
    }
    boxList[n].className='active';
    divList[n].className='active';
}


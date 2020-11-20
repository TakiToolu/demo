var oBox=document.getElementById('oBox');
var boxList=oBox.getElementsByTagName('li');
for (var i = 0; i < boxList.length; i++) {
    boxList[i].className='bg'+(i%3);
}

/*

for (let i = 0; i < boxList.length; i++) {
    boxList[i].onmouseover=function () {
        this.style.backgroundColor='yellow';
    };
    boxList[i].onmouseout=function () {
        this.style.backgroundColor='';
    }
}

//1利用CSS的优先级搞定，默认背景颜色给予样式类完成，
// 鼠标划过的样式类优先级高一些即可（ID选择器、行内样式）
for (let i = 0; i < boxList.length; i++) {
    boxList[i].onmouseover=function () {
        this.id='hover';
    };
    boxList[i].onmouseout=function () {
        this.id='';
    }
}
*/



/*
//保存当前样式类，鼠标一开后在恢复
for (let i = 0; i < boxList.length; i++) {
    boxList[i].onmouseover=function () {
        boxList[i].myIndex=this.className;
        //自定义属性myindex保存现有的类，简单粗暴修改类
        this.className='hover';
    };
    boxList[i].onmouseout=function () {
        //鼠标离开，改回原有类
        this.className=this.myIndex;
    }
}
*/


/*2鼠标滑过，在原有样式类上加hover，在CSS样式中hover处于
元别色样式类后，同在一起时才起作用。
鼠标离开时 将所加hover类替换成空
*/
//over放于bg0后面，当同属两个类时，取后面的hover样式类h

for (let i = 0; i < boxList.length; i++) {
    boxList[i].onmouseover=function () {
        boxList[i].myIndex=this.className;
        this.className+=' hover';
    };
    boxList[i].onmouseout=function () {
        //鼠标离开，改回原有类
        this.className=this.className.replace('hover','');
    }
}

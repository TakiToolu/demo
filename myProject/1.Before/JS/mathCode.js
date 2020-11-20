/*生成一个四位验证码
* */
var codeBox=document.getElementById('codeBox');
var link=document.getElementById('link');

function randomCode4(){
    //备选区域，索引0-61
    var codeArea="qwertyuiopasdfghjklzxcvbnm" +
        "QWERTYUIOPASDFGHJKLZXCVBNM" +
        "1234567890";
    var item='';

    while (item.length<4){
        var n=Math.round(Math.random()*61);
        var myChar=codeArea.charAt(n);
        if(item.indexOf(myChar)==-1){
            item+=myChar;
        }
    }

/*
    for (let i = 0; i < 4; i++) {
        var n=Math.round(Math.random()*61);
        var myChar=codeArea.charAt(n);
        //生成四个不一样的
        if(item.indexOf(myChar)>-1){
            i--;
            continue;
        }
        var item=item+myChar;

    }
    */

    return item;
}
//开始加载页面，生成一个验证码
codeBox.innerHTML=randomCode4();//执行方法，吧return的值返回到codebox的盒子中
link.onclick=function () {
    codeBox.innerHTML=randomCode4();

}
/*
let xhr=new XMLHttpRequest();
xhr.open('get','temp.json',false);
xhr.onreadystatechange=()=>{
    console.log(xhr.readyState);
};
xhr.send();
//只输出一次，结果是4
*/

/*
let xhr=new XMLHttpRequest();
xhr.open('get','temp.json',false);
xhr.send();
//同步，开始发送AJAX任务，在任务没有完成之前，
//什么都做不了（包含下面时间绑定操作）=>LOADING=>当readystate===4的时候AJAX任务完成，
//开始执行下面的操作
xhr.onreadystatechange=()=>{
    console.log(xhr.readyState);
};
//绑定方法之前，send函数，一个整体事务已经完成（readyState=4）且不会改变，
// 所以时间永远不会被触发，一次都没有执行，这样无法再绑定的方法中获取到相应主体的内容
//
*/


/*
let xhr=new XMLHttpRequest();
xhr.open('get','temp.json');

xhr.onreadystatechange=()=>{
    console.log(xhr.readyState);
};
xhr.send();
//输出结果3次：2 3 4*/

let xhr=new XMLHttpRequest();
xhr.onreadystatechange=()=>{
    console.log(xhr.readyState);
};
xhr.open('get','temp.json');
xhr.send();
//结果：1 2 3 4
var personArr=[
    {name:'王万',src:'./pic/dai.jpg',des:'我是小黄毛',sex:'m',age:16},
    {name:'王婉',src:'./pic/Lan.jpg',des:'我是小懒猫',sex:'f',age:18},
    {name:'赵晓',src:'./pic/yaya.jpg',des:'小鸭子是我',sex:'f',age:18},
    {name:'张硕',src:'./pic/mnu.jpg',des:'在偷窥',sex:'m',age:20},
    {name:'赵云',src:'./pic/mi.jpg',des:'我在睡觉觉',sex:'m',age:17}
];
//出事变量
//构造函数 名需开头大写

var oUl=document.getElementsByTagName('ul')[0];
var oInput=document.getElementsByTagName('input')[0];
var oBtnArr=[].slice.call(document.getElementsByClassName('btn'));
var lastActiveBtn=oBtnArr[2];//oBtnArr若直接获取是类数组，由【】。slice变成数组
var state={
    text:'',
    sex:'',
    age:''
}
//
store.subscribe(function(){
   // alert(0);
    //更新视图
    RenderPage(lastFilterArr(personArr));
})

function RenderPage(data) {
    var htmlStr='';
    //遍历
    oUl.innerHTML='';
    data.forEach(function (ele,index,self) {
       // console.log(ele);
       // console.log(ele);
        htmlStr+='<li><img src="'+ele.src+'" ></img><p class="name">'+ele.name+'</p><p class="des">'+ele.des+'</p></li>';
    });
   // console.log(htmlStr);
    oUl.innerHTML=htmlStr;
   // console.log('x渲染');
    // console.log(oUl);
}

//效果添加

//添加行为
oInput.oninput=debounce(function () {
    //var filterText=this.value;
    //state.text=filterText;
    store.dispatch({type:'text',value:this.value})
   // RenderPage(lastFilterArr(personArr));
    //RenderPage( filterArrayByText(personArr,filterText));
},500);

oBtnArr.forEach(function (ele,index,self) {
    ele.onclick=debounce(function () {
        changeActive(this);
        var _sex=this.getAttribute('sex');
        store.dispatch({type:'sex',value:_sex});
      // RenderPage(lastFilterArr(personArr));
        //RenderPage(filterBySex(personArr,thisSex));
    },500);
})
function changeActive(curActiveBtn) {
    curActiveBtn.className='btn active';
    lastActiveBtn.className='btn';
    lastActiveBtn=curActiveBtn;
}


//redex优化——增加条件

let xhr=new XMLHttpRequest();
xhr.open('get','temp.json?_='+Math.random(),true);
xhr.setRequestHeader('cooki','zxx');//value值不可以是中文，请求头部的内容中
//1.js:3 Uncaught TypeError: Failed to execute 'setRequestHeader' on 'XMLHttpRequest': Value is not a valid ByteString.
//at 1.js:3_________设置请求头内容不是一个有效的值

xhr.timeout=1000;
xhr.ontimeout=()=>{
    console.log('当前请求已超时');
    xhr.abort();
}
console.log(xhr.readyState);
console.log(status);

xhr.onreadystatechange=function () {
    let {readyState:state,status}=xhr;
    //说明请求数据成功了
    console.log(state);
    console.log(status);

    if(!/^(2|3)\d{2}$/.test(status)) return;
    //在状态为2时就可以获取响应头信息
    if(state===2){
        let headAll=xhr.getAllResponseHeaders(),
            serverDate=xhr.getResponseHeader('date');
        console.log(headAll,serverDate);
        return;
    }
    if(state===3){
        console.log("响应体正在传送路上");
    }

    //在状态为4时，响应主体内容就已经回来了
    if(state===4){
        let valueText=xhr.responseText,
            valueXML=xhr.responseXML;
        console.log(valueText, valueXML);
    }

}
xhr.send('name=zxx&age=26&sex=woman');

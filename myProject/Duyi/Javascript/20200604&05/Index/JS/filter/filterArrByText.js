//根据文本进行过滤,纯函数，防止原数据被修改
function filterArrByText(data,text) {
    if(!text){
        return data;
    }else{
        return data.filter(function (ele,index) {
            return ele.name.indexOf(text)!=-1;
        } );
    }
}
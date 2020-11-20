//根据性别过滤
function filterArrBySex(data,sex) {
   // console.log(sex);
    if(sex=='a'||''){
        return data;
    }else{
        //console.log(data);
        return data.filter(function (ele,index,self) {
            return ele.sex==sex;
        });
    }
}
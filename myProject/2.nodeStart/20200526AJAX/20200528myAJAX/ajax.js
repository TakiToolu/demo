~function(){
 //   class ajax{}; //ES6中这样创建个类的话，不允许下面的调用方式
    class AjaxClass{
        //send ajax
    init (){
            //this：example
            let xhr=new XMLHttpRequest();
            xhr.onreadystatechange=()=>{
                if(!/^[23]\d{2}$/.test(xhr.status))return;
                if(xhr.readyState===4){
                    let result =xhr.responseText;
                    //dataType二次处理,

                    if(this.dataType){

                        switch(this.dataType.toUpperCase()){
                            case 'TEXT':break;
                            case 'HTML':break;
                            case 'JSON':

                                result=JSON.parse(result);
                                //console.log('ceshi1');
                               // console.log(result);


                                break;
                            case 'XML':
                                result=xhr.responseXML;
                        }
                    }
                    console.log(result);
                    this.success=result;
                    console.log(this.success);
                }
        }
        //data处理,此处data为空不执行
        if(this.data!=null){
            this.formatData();
            if(this.isGET){
                 //console.log(this);
               // console.log(this.querySymbl());
                this.url+=this.querySymbl()+this.data;
                //this.url+=`${this.querySymbol()}${this.data}`;
                this.data=null;
            }
        }
            //cache处理
            //console.log(this.isGET);
            this.isGET?this.cacheFn():null;
            //console.log(this.url);
            xhr.open(this.method,this.url,this.async);
            xhr.send(this.data);
        }
    cacheFn(){
            //this:example
       // console.log(this);
        //console.log(this.querySymbl());
        !this.cache?this.url+=`${this.querySymbl()}_=${Math.random()}`:null;
        console.log(this.url);
    };
    querySymbl(){
        //this.example
            return this.url.indexOf('?')>-1?'&':'?';
        };


    formatData(){//convert the passed object data to string data
        //this.example
        //如果当前data是对象，将其变为字符串data
        //if(typeof this.data !=='string'){  //不严谨
        //if(({}).toString().call(this.data))==='[obiect Object]'{
        if(Object.prototype.toString().call(this.data)=='[obiect Object]'){ //展开上一项
            let obj=this.data,
                str='';
            for(let key in obj){
                if(obj.hasOwnProperty(key)){
                    str+=`${key}=${obj[key]}&`;
                }
            }
            str=str.replace(/&$/g,'');
            this.data=str;

        }
    }


    }
    //init parameters
    ajax=function({


                          url=null,        //ES6中的传参默认值
                          method='get',
                          type=null,
                          data=null,
                          sataType='JSON',
                          cache=true,
                          async=null
    }={}){
        let example=new AjaxClass();
        //优化以下代码
      /*  ['url','method','type','data','sataType','cache','async'].forEach((item)=>{
            if(item==='method'){
                example.method=type===null?method:type;

            }
            if(item==='success'){
                example.success=typeof success==='function' ?success: new Function();
            }
            example[item]=eval(item);
        });*/
        example.url=url;
        example.method=type===null?method:type;
        example.data=data;
        example.dataType=sataType;
        example.cache=cache;
        example.async=async;

        example.success=typeof success==='function' ?success: new Function();
        example.isGET=/^(GET|DELETE|HEAD)$/i.test(example.method);
       // console.log(example.isGET);
        //console.log(example);
        example.init();
        //console.log(example);
        return example;

      //  return new ajaxClass();
    };

}();

/*
* 调用方式：
* ajax（{}）；
* */
~function () {
    let box=document.getElementById('box');
    let serverTime=null;
    let n=1000;

    let fn =()=>{
        //1、计算当前时间与目标时间的差值
        serverTime+=n;
        console.log(serverTime);
        //n=1000;
        //每间隔1s，需要把第一次获取的时间进行累加
        //new Date(),//获取的是客户端本机的时间（会受到客户端自己调整时间的影响），
            //重要的时间参考不能基于这个完成，不管是哪一个客户端都需要基于相同的服务器时间计算
        tarTime=new Date('1970/5/27 22:15:00'),
            spanTime=tarTime-serverTime;//data以毫秒为单位
        // console.log(nowTime.toString());
        //2、计算差值中包含多少时间
        if(spanTime<0){
            //已经错过了抢购的时间（已经开始了）
            box.innerHTML='已经开抢';
            clearInterval(autoTimer);
            return;
        }
        let hours=Math.floor(spanTime/(1000*60*60));
        //console.log(hours);
        spanTime-=hours*3600000;

        let minutes=Math.floor(spanTime/(1000*60));
        // console.log(minutes);
        spanTime-=minutes*60000;
        let seconds=Math.floor(spanTime/1000);
        // console.log(seconds);
        hours<10?hours='0'+hours:null;
        minutes<10?minutes='0'+minutes:null;
        seconds<10? seconds='0'+seconds:null;
        box.innerHTML='距离开抢还剩' +
            `${hours}:${minutes}:${seconds}`

    };
    // fn();
    //从服务器端获取服务器时间
    let getServerTime=()=>{
        let xhr=new XMLHttpRequest();
        console.log(xhr);
        xhr.onreadystatechange=()=>{
            console.log(xhr.readyState);//HEAD 请求方式，状态码中没有3（不需要响应主体）
            if(!/^(2|3)\d{2}$/.text(xhr.status)) return;
            if(xhr.readyState===2){
                 serverTime=new Date(xhr.getResponseHeader('date'));
                console.log(serverTime);
                fn();
            }
        };
        xhr.open('head','temp.xml',true);
    };
    let autoTimer=setInterval(fn,1000);
        /*
        获取时间总会出现时差问题：服务器吧时间记录好，到客户端获取到，事件有延迟差（服务器返回的时候记录的
        是10:00，我们客户端获取的时候已经是10:01），但是我们获取的结果仍然是10:00，有1个单位时间差
        * 1、服务器返回的时间在响应头信息就有，我们只需要获取响应头信息即可，
        * 没必要获取相应主体内容，所以请求方式使用HEAD
        * 2、必须使用异步编程：懂不编程我们无法再状态为2或3的时候做一些处理，
        * 而我们获取响应头信息，在状态为2的时候就把服务器的时间获取了，所以使用异步编程
        * 3、在状态为2的时候就把服务器的时间获取服务器时间
        * */


}();
//核心功能：全屏滚动
//实例方法
$.fn.extend({
    myFullPage :function (config) {
        //config.colorsArray
        //初始化变量
        var colorsArray = config.colorsArray;
       // console.log(this);
        var $Wra =$(this);//.find('.section');
       // console.log($Wra);
        var $Section=$Wra.find('.section');
       // console.log($Section);
        var commonStyle = {
            width: '100%',
            height: '100%',
            margin: 0,
            padding:0
        }
        var clientWidth = $(window).outerWidth();
        var clientHeight = $(window).outerHeight();
        var curIndex=0;
        var lock=true;

        //初始化样式
        $('html')
            .add('body')
            .css({
                margin: 0,
                overflow: 'hidden',
                position: 'relative'
            })
            .add($Wra)//Wrapper 横条
            .css({
                position: 'absolute',
                left: 0,
                top: 0
            })
            .add('.section')
            .css(commonStyle)
        $Wra.css({position: 'absolute', left: 0, top: 0})
            .find('.section')
            .each(function (index, ele) {
                $(ele).css({
                    backgroundColor: colorsArray[index],
                    position: 'relative'
                }).find('.slide')
                    .css({float: 'left', width: clientWidth, height: clientHeight})
                    .wrapAll('<div class="slideWrapper"></div>')
            });

        $Section.find('.slideWrapper').each(function (index, ele) {
            var eleWidth=$(ele).find('.slide').length*clientWidth;//.size();//
          //  console.log(eleWidth);
            $(ele).css({width:eleWidth, height: clientHeight})
        })
        //js控制移动
        //active 先给第一个section active
        //给每一个section 下面的第一个slide innerActive
        $Section.eq(0)
            .addClass('active')
            .end()
            .find('.slideWrapper')
            .css({position:'absolute',left:0,top:0})
                .each(function (index,ele) {
                  //  console.log('test');
                    $(ele).find('.slide').eq(0).addClass('innerActive')
        })

        //控制移动
        $(document).on('keydown',function (e) {
            //e.which
            //left 37 top 38 right 39 bottom 40
            if(lock){
                lock=false;
                var direction='';
                if(e.which==38||e.which==40){
                    //垂直移动$Wra
                    var newTop=$Wra.offset().top;
                    if(e.which==38 && curIndex !=0){
                        //top
                        direction='top';
                        config.onLeave(curIndex,direction);
                        curIndex--;
                        newTop+=clientHeight;
                        
                    }else if(e.which == 40 && curIndex!=$Section.length-1){
                        //bottom
                        direction='bottom';
                        config.onLeave(curIndex,direction);
                        curIndex++;
                        newTop-=clientHeight;
                        
                    }
                }
                $Wra.animate({
                    top:newTop,
                },350,'swing',function () {
                    lock=true;
                    $Section.eq(curIndex).addClass('active');
                    if(direction=='top'){
                        $Section.eq(curIndex+1).removeClass('active');
                    }else{
                        $Section.eq(curIndex-1).removeClass('active');
                    }
                });

            }

            if(e.which=='39'||e.which=='37'){
                if(lock){
                    //水平移动$Wra
                    lock=false;
                    var $SW =$('.active').find('.slideWrapper');
                    var newLeft=$SW.offset().left;
                    var curShowDown = $SW.find('.innerActive');
                    var innerIndex=curShowDown.index();
                    // console.log('1:');
                    // console.log(curShowDown);
                    if(e.which==37){ // &&innerIndex !=0
                        //left
                        newLeft+=clientWidth;
                        direction='left';
                        console.log(direction);
                      //  console.log(curIndex);
                        if (newLeft==-clientWidth*(curShowDown.length+1)){
                            newLeft=-newLeft;
                        }


                    }else if(e.which == 39 ) { //&& innerIndex!=0
                        //right]
                        newLeft -= clientWidth;
                        direction = 'right';
                        if (newLeft==clientWidth*(curShowDown.length+1)){
                            newLeft=0;
                        }

                    }

                    //     console.log($SW);
                    $SW.animate({
                         left:newLeft
                    },200,'swing',function () {
                        lock=true;
                       // console.log('2:');
                       //  console.log(curShowDown);
                        console.log(direction);
                        direction !=null? curShowDown.removeClass('innerActive'):'';
                        if(direction=='left'){
                            curShowDown.prev().addClass('innerActive');
                        }else{
                            curShowDown.next().addClass('innerActive');
                        }
                        config.afterLoad(curIndex,direction);
                    })
                }
            }


        })





    }
});
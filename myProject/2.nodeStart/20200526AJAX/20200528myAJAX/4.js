ajax({
    url:'temp.json',
    dataType:'Json',
        cache:false,
        success: function(result)=>{
        console.log(result);
    }
});
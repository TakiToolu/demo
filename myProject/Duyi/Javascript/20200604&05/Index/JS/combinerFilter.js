function  combinerfilter(config) {
    return function (data) {
        for (var prop in config) {
          // console.log(prop,config[prop]);
          //  console.log('赋值前')
            data=config[prop](data,store.getStore(prop));
          //  console.log(data);
           // console.log('赋值后')
         //   console.log(state[prop]);
        }
        return data;
    }
}

var lastFilterArr=combinerfilter({
    text:filterArrByText,
    sex: filterArrBySex
})

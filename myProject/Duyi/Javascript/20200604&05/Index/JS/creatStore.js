function creatStore(initialState) {
    var state=initialState|| {};
    var list=[];
    function getState(type) {
        return state[type];
    }
    function dispatch(action) {
        state[action.type]=action.value;
        //调用之前订阅过的函数
        list.forEach(function (ele) {
            ele();
        })
    }
    function subscribe(func) {
        list.push(func);

    }

    return{
        getStore:getState,
        dispatch:dispatch,
        subscribe:subscribe
    }
}
var store = creatStore(state= {
    text: '', sex: 'a'})
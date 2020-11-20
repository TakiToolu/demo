/*
//方法1
ar obj=require('./mySum.js');
var a=obj.mysum(1,3,5,7);
console.log(a);
*/

/*
//方法2
var mysum=require('./mySum.js');
var a=mysum(1,3,5,7);
console.log(a);
*/

/*

var sum=require('sum');//包sum的引入
var a=sum(1,3,5,7);
console.log(a);
console.log(__filename);
console.log(__dirname);
*/


/*
//错误的方法，只能用方式2
var obj=require('sum');//包sum的引入
var a=obj.sum(1,3,5,7);
console.log(a);
console.log(__filename);
console.log(__dirname);*/

//引入默认变量以及方法 和模块到处的m1、m2变量或方法
import theDefault,{m1,m2} from 'lib';
//引入默认变量及方法
import theDefault from 'lib';
//引入模块导出的m1、m2变量或方法
import {m1,m2} from 'lib';
//引入模块导出的m1 并且将m1重命名myName m2变量或方法
import {m1 as myName,m2} from 'lib';
//拿到模块中定义所有方法放到myLib对象中 然后通过myLib对象引用
import * as myLib from 'lib';
//只将lib加载进来 没有用到lib中暴露的接口
import 'lib';

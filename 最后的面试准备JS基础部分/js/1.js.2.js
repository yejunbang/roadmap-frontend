1. 如何判断一个变量是不是数组？
使用 Array.isArray 判断，如果返回 true, 说明是数组
使用 instanceof Array 判断，如果返回true, 说明是数组
使用 Object.prototype.toString.call 判断，如果值是 [object Array], 说明是数组
通过 constructor 来判断，如果是数组，那么 arr.constructor === Array. (不准确，因为我们可以指定 obj.constructor = Array)


ES5: Array.prototype.slice.call()
ES6: Array.from: 可以将类数组和可遍历对象转为真正的数组
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

// ES5的写法
var arr1 = Array.prototype.slice.call(arrayLike); 
console.log('====output====>>>',arr1);

2. 类数组和数组的区别是什么？
类数组是一个普通对象，而真实的数组是Array类型，不具有数组所具有的方法；
常见的类数组有: 函数的参数 arguments, DOM 对象列表(比如通过 document.querySelectorAll 得到的列表), jQuery 对象 (比如 $("div")).
类数组可以转换为数组：
//第一种方法
Array.prototype.slice.call(arrayLike, start);
//第二种方法
[...arrayLike];
//第三种方法:
Array.from(arrayLike);

3. == 和 === 有什么区别？
=== 不需要进行类型转换，只有类型相同并且值相等时，才返回 true.
== 如果两者类型不同，首先需要进行类型转换。具体流程如下:
  首先判断两者类型是否相同，如果相等，判断值是否相等.
  如果类型不同，进行类型转换
  判断比较的是否是 null 或者是 undefined, 如果是, 返回 true .
  判断两者类型是否为 string 和 number, 如果是, 将字符串转换成 number
  判断其中一方是否为 boolean, 如果是, 将 boolean 转为 number 再进行判断
  判断其中一方是否为 object 且另一方为 string、number 或者 symbol , 如果是, 将 object 转为原始类型再进行判断

  [] == ![]  true

首先，我们需要知道 ! 优先级是高于 == (更多运算符优先级可查看: 运算符优先级)
![] 引用类型转换成布尔值都是true,因此![]的是false
根据上面的比较步骤中的第五条，其中一方是 boolean，将 boolean 转为 number 再进行判断，false转换成 number，对应的值是 0.
根据上面比较步骤中的第六条，有一方是 number，那么将object也转换成Number,空数组转换成数字，对应的值是0.(空数组转换成数字，对应的值是0，如果数组中只有一个数字，那么转成number就是这个数字，其它情况，均为NaN)
0 == 0; 为true


4. let、const 以及 var 的区别是什么？
let 和 const 定义的变量不会出现变量提升，而 var 定义的变量会提升。
let 和 const 是JS中的块级作用域
let 和 const 不允许重复声明(会抛出错误)
let 和 const 定义的变量在定义语句之前，如果使用会抛出错误(形成了暂时性死区)，而 var 不会。
const 声明一个只读的常量。一旦声明，常量的值就不能改变(如果声明是一个对象，那么不能改变的是对象的引用地址)

5. 在JS中什么是变量提升？什么是暂时性死区？
变量提升就是变量在声明之前就可以使用，值为undefined
变量提升就是变量在声明之前就可以使用，值为undefined。
在代码块内，使用 let/const 命令声明变量之前，该变量都是不可用的(会抛出错误)。这在语法上，称为“暂时性死区”。暂时性死区也意味着 typeof 不再是一个百分百安全的操作。
typeof x; // ReferenceError(暂时性死区，抛错)
let x;
复制代码typeof y; // 值是undefined,不会报错
复制代码暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。


6. 取数组的最大值（ES5、ES6）
// ES5 的写法
Math.max.apply(null, [14, 3, 77, 30]);

// ES6 的写法
Math.max(...[14, 3, 77, 30]);

// reduce
[14,3,77,30].reduce((accumulator, currentValue)=>{
    return accumulator = accumulator > currentValue ? accumulator : currentValue
});

7. Object.is() 与比较操作符 ===、== 有什么区别？\
Object.is() 类似于 ===, 但：
NaN 和 NaN 相等
-0 和 +0 不相等
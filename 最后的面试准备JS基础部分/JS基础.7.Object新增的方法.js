es6新增的方法：
1. Object.is(): 
与==区别：
==缺点：NaN不等于自身，以及+0等于-0

Object.is()行为与===一致

console.log('====output====>>>',Object.is(NaN,NaN));
console.log('====output====>>>',Object.is(+0,-0));


2. Object.assign()
Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）

const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

如果对象里面的值是基本类型，相当于深拷贝

3. Object.create()// 这不是es6新增的，只是想手写它的实现
接受两个参数：(1)新创建的对象的原型，(2)所创建对象的访问器属性
Function create(o){
  function F(){}
  F.prototype = o;
  return new F();
}

4. Object.setPrototypeOf()、Object.getPrototypeOf()、Object.prototype.__proto__

5. Object.keys()，Object.values()，Object.entries()





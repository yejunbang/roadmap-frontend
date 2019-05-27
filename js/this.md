# 如何正确的判断this? 箭头函数的this是什么？
this的绑定规则有四种：默认绑定，隐式绑定，显式绑定，new绑定。

1. 函数是否在 new 中调用(new绑定)，如果是，那么 this 绑定的是新创建的对象【前提是构造函数中没有返回对象或者是function，否则this指向返回的对象/function】。
2. 函数是否通过 call,apply 调用，或者使用了 bind (即硬绑定)，如果是，那么this绑定的就是指定的对象。
3. 函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this 绑定的是那个上下文对象。一般是 obj.foo()
4. 如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到 undefined，否则绑定到全局对象。
5. 如果把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind, 这些值在调用时会被忽略，实际应用的是默认绑定规则。
6. 箭头函数没有自己的 this, 它的this继承于上一层代码块的this。

# 如何准确判断this指向的是什么
**this 就是一个指针，指向调用函数的对象**
this的绑定规则有哪些？

1. 默认绑定
2. 隐式绑定
3. 硬绑定
4. new绑定

优先级为:

new绑定 > 显式绑定 > 隐式绑定 > 默认绑定


## 默认绑定
默认绑定，在不能应用其它绑定规则时使用的默认规则，通常是独立函数调用
```
function sayHi(){
    console.log('Hello,', this.name);
}
var name = 'YvetteLau';
sayHi();
```
在调用Hi()时，应用了默认绑定，this指向全局对象（非严格模式下），严格模式下，this指向undefined，undefined上没有this对象，会抛出错误。  
如果我们将null或者是undefined作为this的绑定对象传入call、apply或者是bind,这些值在调用时会被忽略，实际应用的是默认绑定规则。

## 隐式绑定
函数的调用是在某个对象上触发的，即调用位置上存在上下文对象。典型的形式为 XXX.fun().我们来看一段代码：
```
function sayHi(){
    console.log('Hello,', this.name);
}
var person = {
    name: 'pogba',
    sayHi: sayHi
}
var name = 'Wiliam';
person.sayHi();

//Hello,pogba.
```
sayHi函数声明在外部，严格来说并不属于person，但是在调用sayHi时,调用位置会使用person的上下文来引用函数，隐式绑定会把函数调用中的this(即此例sayHi函数中的this)绑定到这个上下文对象（即此例中的person）  

对象属性链中只有最后一层会影响到调用位置。
```
function sayHi(){
    console.log('Hello,', this.name);
}
var person2 = {
    name: 'pogba1',
    sayHi: sayHi
}
var person1 = {
    name: 'pogba',
    friend: person2
}
person1.friend.sayHi();

// Hello,pogba1
```
只有最后一层会确定this指向的是什么，不管有多少层，在判断this的时候，我们只关注最后一层

## 显式绑定
显式绑定比较好理解，就是通过call,apply,bind的方式，显式的指定this所指向的对象。
call,apply和bind的第一个参数，就是对应函数的this所指向的对象。call和apply的作用一样，只是传参方式不同。call和apply都会执行对应的函数，而bind方法不会。

```
function sayHi(){
    console.log('Hello,', this.name);
}
var person = {
    name: 'YvetteLau',
    sayHi: sayHi
}
var name = 'Wiliam';
var Hi = person.sayHi;
Hi.call(person); //Hi.apply(person)
```

## new绑定
在javaScript中，构造函数只是使用new操作符时被调用的函数，这些函数和普通的函数并没有什么不同，它不属于某个类，也不可能实例化出一个类。任何一个函数都可以使用new来调用，因此其实并不存在构造函数，而只有对于函数的“构造调用”。

> 使用new来调用函数，会自动执行下面的操作：
> 1. 创建一个新对象
> 2. 将构造函数的作用域赋值给新对象，即this指向这个新对象
> 3. 执行构造函数中的代码
> 4. 返回新对象

```
function sayHi(name){
    this.name = name;
	
}
var Hi = new sayHi('pogba');
console.log('Hello,', Hi.name);
```

## 箭头函数中的this
this继承于外层代码库中的this


[参考: 你真的懂this吗](https://github.com/YvetteLau/Blog/issues/6)
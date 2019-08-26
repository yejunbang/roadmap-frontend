1. 谈谈你对原型的理解?
在 JavaScript 中，每当定义一个对象（函数也是对象）时候，对象中都会包含一些预定义的属性。
其中每个函数对象都有一个prototype 属性，这个属性指向函数的原型对象。使用原型对象的好处是所有对象实例共享它所包含的属性和方法


2. 什么是原型链？
每个对象拥有一个原型对象，通过 proto (读音: dunder proto) 指针指向其原型对象，
并从中继承方法和属性，同时原型对象也可能拥有原型，这样一层一层，最终指向 null(Object.proptotype.__proto__ 指向的是null)。
这种关系被称为原型链 (prototype chain)，通过原型链一个对象可以拥有定义在其他对象中的属性和方法。

我答：每个对象都有一个原型对象prototype，指向原型对象，当一个原型对象指向另一个对象时，
拥有另一个对象的属性及方法，这样一层层指向Object.prototype.__proto__
console.log('====output====>>>',Object.prototype.__proto__); //null

3. prototype 和 __proto__ 区别是什么？
prototype是构造函数的属性
__proto__ 是每个实例都有的属性，可以访问 [[prototype]] 属性。
实例的__proto__ 与其构造函数的prototype指向的是同一个对象。
function Fn(){}
const fn = new Fn()
fn.__proto__ === Fn.prototype
console.log('====output====>>>',Fn.prototype.constructor);


4. 原型链解决继承问题：
继承有5中实现：
(1) 构造函数继承:
function Father(){
  this.name = 'pogba';
  this.colors = ['red','blue']
}
function Child(){
  Father.call(this);// 把父类构造函数的属性及方法绑到自己身上
}
const child = new Child();
console.log('====output====>>>',child.name);
缺点：不能访问父类原型链上的属性及方法
(2) 原型链继承：
function Father(){
  this.name = 'pogba';
  this.colors = ['red','blue']
}
function Child(){}
Child.prototype = new Father()

const child = new Child();
const child2 = new Child();
console.log('====output====>>>',child.name);
console.log('====output====>>>',child.colors.push('green'));
console.log('====output====>>>',child.colors);
console.log('====output====>>>',child2.colors);
console.log('====output====>>>',child.constructor);
缺点： 能访问父类构造函数及原型链上的属性及方法，但是却是共享引用类型了，当一个子类实例添加colors内容，所有实例都受影响,
且原型的constructor不是子类构造函数了
Child.prototype.constructor = Child //手动指回去

(3) 组合继承：
function Father(){
  this.name = 'pogba';
  this.colors = ['red','blue']
}
function Child(){
  Father.call(this)
}
Child.prototype = new Father()
const child = new Child()
console.log('====output====>>>',child.constructor);
缺点：执行了两遍父类构造函数，且原型的constructor不是子类构造函数了
Child.prototype.constructor = Child //手动指回去

(4) 寄生组合继承：
function Father(){
  this.name = 'pogba';
  this.colors = ['red','blue']
}
function Child(){
  Father.call(this)
}
Child.prototype = Object.create(Father.prototype)
const child = new Child()
console.log('====output====>>>',child.name);
console.log('====output====>>>',child.constructor);  // Father
比较完美的实现继承
Child.prototype.constructor = Child //手动指回去

(5) ES6的extends
class Father {
  constructor(){
    this.name = 'pogba'
    this.colors = ['red','blue']
  }
}
class Child extends Father{
  constructor(){
    super() // 必须手动调用父类constructor
    this.age = 12
  }
}
const child = new Child()
console.log('====output====>>>',child.name);
与es5继承区别：super()相当于Father.call(this)
ES5 是先创造构造函数 B 的实例，然后在让这个实例通过 A.call(this) 实现实例属性继承，
在 ES6 中，是先新建父类的实例对象this，然后再用子类的构造函数修饰 this，使得父类的所有行为都可以继承

我答：从过程来看，es5是先创建子类实例，再把父类属性及方法和原型链绑到自己身上
es6是先创建父类实例对象this，再执行子类constructor把属性及方法绑到自己身上
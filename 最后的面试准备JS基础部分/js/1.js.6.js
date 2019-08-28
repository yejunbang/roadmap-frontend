1. 谈谈你对原型的理解？
在 JavaScript 中，每当定义一个对象（函数也是对象）时候，对象中都会包含一些预定义的属性。
其中每个函数对象都有一个prototype 属性，这个属性指向函数的原型对象。使用原型对象的好处是所有对象实例共享它所包含的属性和方法。

2. 什么是原型链？【原型链解决的是什么问题？】
原型链解决的主要是继承问题。

每个对象拥有一个原型对象，通过 proto (读音: dunder proto) 指针指向其原型对象，
并从中继承方法和属性，同时原型对象也可能拥有原型，这样一层一层，
最终指向 null(Object.proptotype.__proto__ 指向的是null)。
这种关系被称为原型链 (prototype chain)，通过原型链一个对象可以拥有定义在其他对象中的属性和方法。

3. prototype 和 __proto__ 区别是什么？
prototype是构造函数的属性。

__proto__ 是每个实例都有的属性，可以访问 [[prototype]] 属性。

实例的__proto__ 与其构造函数的prototype指向的是同一个对象。

function Student(name) {
  this.name = name;
}
Student.prototype.setAge = function(){
  this.age=20;
}
let Jack = new Student('jack');
console.log(Jack.__proto__);
//console.log(Object.getPrototypeOf(Jack));;
console.log(Student.prototype);
console.log(Jack.__proto__ === Student.prototype);//true

1. 说下js的继承
js的继承的目的是实现子类实例可以访问父类构造函数及原型链的属性和方法，实现函数复用
js的继承主要依靠原型链来实现
继承的几种主要的实现为：

原型链继承:
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
SubType.prototype = new SuperType()

缺点: 虽然是可以访问到父组件的私有方法和属性, 但是当父类中有属性是引用类型时, 某一个子类修改了这个属性, 那么所有子类都会影响到

借用构造函数实现：
借助call，apply，在子类构造函数的内部调用超类型的构造函数, 这样子类的每个实例都有自己的属性副本
手写实现：
function SuperType(){
  this.colors = ['red','blue']
}
function SubType(){
  SuperType.call(this)
}

缺点：父类原型中的方法对子类不可见。只实现了部分继承

组合继承(最常用的继承方式)：
使用call，apply借用构造函数实现继承，使用原型链实现对原型属性和方法的继承
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function() {
  console.log(this.name);
}

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function() {
  console.log(this.age);
}

缺点：调用了两次父类的构造函数

寄生组合式继承：
function SuperType(name){
  this.name = name
  this.colors = ['red','blue']
}
SuperType.prototype.sayName = function() {
  console.log(this.name)
}
function SubType(name,age){
  SuperType.call(this,name)
  this.age = age
}
function inheritPrototype(subType,superType){
  function F(){}
  F.prototype = superType.prototype
  F.constructor = subType
  subType.prototype = F
}
inheritPrototype(SubType,SuperType)

SubType.prototype.sayAge = function() {
  console.log(this.age);
}

ES6中的class
class SuperType {
  constructor(){
    this.name = name
    this.colors = ['red','blue']
  }
}
class SubType extends SuperType {
  constructor(){
    super()
  }
}
ES5中(上面是先创建子类的实例对象this, 再将父类的方法添加到this上面)
ES6中是先创建父类实例对象的属性和方法, 加到this上面(显示调用super), 然后再用子类的构造函数修改this
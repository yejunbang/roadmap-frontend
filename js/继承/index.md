# 先来看一个实现：
```javascript
function Father(){
	this.favoriteFood = 'tomato'
}
Father.prototype.getFood = function(){
	return this.favoriteFood
}
function Son(){
	this.favoriteFruits = 'apple'
}
//继承
Son.prototype = new Father();
Son.prototype.getFruits = function(){
	return this.favoriteFruits
}
const instance = new Son()
console.log(instance.getFood()) // tomato
```
一个最直观的继承已经实现了，当调用父类方法时，指针会沿着原型链一层层往上查找：  
Son -> Son.prototype -> Father -> Father.prototype -> Object

# 问题来了：
当Father中存在引用时，那么所有的son实例都会共享，操作这个引用，而不会分配不同的引用。
```javascript
function Father(){
	this.favoriteFood = 'tomato'
	this.hobby = ['football','basketball']  // 当存在引用时
}
const instance1 = new Son()  
const instance2 = new Son()  
instance1.hobby.push('ping pong ball')  
console.log(instance2.hobby)  // 'football','basketball','ping pong ball'
```
## 1. 解决方法一：借用构造函数 （很少单独使用）
```javascript
function Father(){
	this.hobby = ['football','basketball']
}
function Son(){
	// 继承
	Father.call(this)
}
```
在子构造函数内部调用父类构造函数，借用call，apply绑定this，就可以把父类构造函数中的属性绑到自己身上
### 结果：
```javascript
const instance1 = new Son()  
const instance2 = new Son()  
instance1.hobby.push('ping pong ball') // 'football','basketball','ping pong ball'  
console.log(instance2.hobby)  // 'football','basketball'
```
### 缺点：
方法都定义在构造函数中，函数复用无从谈起，父类中原型的方法对子类不可见
## 2. 解决方法二：组合继承：(最常用继承模式)
```javascript
function Father(name){
	this.name = name
	this.hobby = ['football','basketball']
}
Father.prototype.sayName = function(){
	console.log(this.name)
}
function Son(name,age){
	// 继承
	Father.call(this,name)
	this.age = age
}
//继承方法
Son.prototype = new Father()
Son.prototype.constructor = Son
Son.prototype.sayAge = function(){
	console.log(this.age)
}
```
### 结果：
```javascript
const instance1 = new Son('pogba',25)  
const instance2 = new Son('jack',26)  
instance1.hobby.push('ping pong ball') // 'football','basketball','ping pong ball'  
console.log(instance2.hobby)  // 'football','basketball'
```
### 缺点：
会调用两次父类构造函数
### 3. 解决方法三：寄生组合式继承 （是引用类型最理想的继承范式）
```javascript
// 原型式继承：
function object(o){
	function F(){}
	F.prototype = o
	return new F()
}
// 寄生式继承：
function createAnother(original){
	const clone = object(original)
	clone.sayHi = function(){
		console.log('hi')
	}
	return clone
}
// 寄生组合式继承：
function inheritPrototype(son, father){
	const prototype = object(father.prototype)
	prototype.constructor = son
	son.prototype = prototype
}
// 使用：
function Father(name){
	this.name = name
	this.hobby = ['football','basketball']
}
Father.prototype.sayName = function(){
	console.log(this.name)
}
function Son(name,age){
	// 继承
	Father.call(this,name)
	this.age = age
}
inheritPrototype(Son, Father) // 把Father的原型链寄生了，就不会有调用两次的情况发生
Son.prototype.sayAge = function(){
	console.log(this.age)
}
```
不必为了子类的原型而调用父类的构造函数，寄生回一个父类原型的副本就行
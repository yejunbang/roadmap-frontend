1. 如何正确的判断this? 箭头函数的this是什么？
this的绑定规则有四种：默认绑定，隐式绑定，显式绑定，new绑定.

函数是否在 new 中调用(new绑定)，如果是，那么 this 绑定的是新创建的对象【前提是构造函数中没有返回对象或者是function，否则this指向返回的对象/function】。
函数是否通过 call,apply 调用，或者使用了 bind (即硬绑定)，如果是，那么this绑定的就是指定的对象。
函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this 绑定的是那个上下文对象。一般是 obj.foo()
如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到 undefined，否则绑定到全局对象。
如果把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind, 这些值在调用时会被忽略，实际应用的是默认绑定规则。
箭头函数没有自己的 this, 它的this继承于上一层代码块的this。

2. 词法作用域和this的区别。
词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的
this 是在调用时被绑定的，this 指向什么，完全取决于函数的调用位置(关于this的指向问题，本文已经有说明)


3. 谈谈你对JS执行上下文栈和作用域链的理解。
执行上下文就是当前 JavaScript 代码被解析和执行时所在环境, JS执行上下文栈可以认为是一个存储函数调用的栈结构，遵循先进后出的原则。

JavaScript执行在单线程上，所有的代码都是排队执行。
一开始浏览器执行全局的代码时，首先创建全局的执行上下文，压入执行栈的顶部。
每当进入一个函数的执行就会创建函数的执行上下文，并且把它压入执行栈的顶部。当前函数执行-完成后，当前函数的执行上下文出栈，并等待垃圾回收。
浏览器的JS执行引擎总是访问栈顶的执行上下文。
全局上下文只有唯一的一个，它在浏览器关闭时出栈。

作用域链: 无论是 LHS 还是 RHS 查询，都会在当前的作用域开始查找，如果没有找到，就会向上级作用域继续查找目标标识符，每次上升一个作用域，一直到全局作用域为止。

4. 什么是闭包？闭包的作用是什么？闭包有哪些使用场景？
闭包是指有权访问另一个函数作用域中的变量的函数，创建闭包最常用的方式就是在一个函数内部创建另一个函数。

闭包的作用有:

封装私有变量
模仿块级作用域(ES5中没有块级作用域)
实现JS的模块













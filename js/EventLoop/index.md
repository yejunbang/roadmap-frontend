# 事件循环 Event Loop
## 从promise、process.nextTick、setTimeout出发，谈谈Event Loop中的Job queue

- 简要介绍：谈谈promise.resove,setTimeout,setImmediate,process.nextTick在EvenLoop队列中的执行顺序  
问题的引出 event loop都不陌生，是指主线程从“任务队列”中循环读取任务，event loop读取任务的先后顺序，取决于任务队列（Job queue）中对于不同任务读取规则的限定

例1：
```
setTimeout(function(){console.log(1)},0);

console.log(2)

//输出2,1
```
在上述的例子中，我们明白首先执行主线程中的同步任务，当主线程任务执行完毕后，再从event loop中读取任务，因此先输出2，再输出1。

例2：
```
setTimeout(function () {
  console.log(3);
}, 0);

Promise.resolve().then(function () {
  console.log(2);
});
console.log(1);

//输出为  1 2 3
```

Job queue中的执行顺序 在Job queue中的队列分为两种类型：macro-task和microTask。我们举例来看执行顺序的规定，我们设macro-task队列包含任务: a1, a2 , a3 micro-task队列包含任务: b1, b2 , b3

执行顺序为，首先执行marco-task队列开头的任务，也就是 a1 任务，执行完毕后，在执行micro-task队列里的所有任务，也就是依次执行b1, b2 , b3，执行完后清空micro-task中的任务，接着执行marco-task中的第二个任务，依次循环。


在node V8中，这两种类型的真实任务顺序如下所示：  
macro-task（宏任务）队列真实包含任务：  
script(主程序代码),setTimeout, setInterval, setImmediate, I/O, UI rendering  
micro-task（微任务）队列真实包含任务：  
process.nextTick, Promises, Object.observe, MutationObserver

由此我们得到的执行顺序应该为：

script(主程序代码)—>process.nextTick—>Promises…——>setTimeout——>setInterval——>setImmediate——> I/O——>UI rendering

在ES6中macro-task队列又称为ScriptJobs，而micro-task又称PromiseJobs

例3：
```
setTimeout(function(){console.log(1)},0);

new Promise(function(resolve,reject){
   console.log(2);
   resolve();
}).then(function(){console.log(3)
}).then(function(){console.log(4)});

process.nextTick(function(){console.log(5)});

console.log(6);

//输出2,6,5,3,4,1
```

这个例子就比较复杂了，这里要注意的一点在定义promise的时候，promise构造部分是同步执行的，这样问题就迎刃而解了。  
首先分析Job queue的执行顺序：  
script(主程序代码)——>process.nextTick——>promise——>setTimeout
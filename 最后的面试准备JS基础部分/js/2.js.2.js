1. 可遍历数据结构的有什么特点？
一个对象如果要具备可被 for...of 循环调用的 Iterator 接口，就必须在其 Symbol.iterator 的属性上部署遍历器生成方法(或者原型链上的对象具有该方法)
PS: 遍历器对象根本特征就是具有next方法。每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。

必须是返回一个对象，对象里有next方法，next方法返回的对象具有value和done属性

手写一个可用for of遍历的对象：
const obj = {
  name:'pogba',
  age: 25,
  [Symbol.iterator]: function(){
    let o = obj
    let keys = Object.keys(obj)
    let i = 0
    return {
      next: function (){
        if(i===keys.length){
          return {value:o[keys[i]],done:true}
        }else{
          return {value:o[keys[i++]],done:false}
        }
      }
    }
  }
}
for(let a of obj){
  console.log('====output====>>>',a);
}

使用generator函数再重构下
const obj = {
  name: 'pogba',
  age: 25,
  [Symbol.iterator]: function* (){
    let keys = Object.keys(obj)
    for(let i=0;i<keys.length;i++){
      yield obj[keys[i]]
    }
  }
}
for(let a of obj){
  console.log('====output====>>>',a);
}
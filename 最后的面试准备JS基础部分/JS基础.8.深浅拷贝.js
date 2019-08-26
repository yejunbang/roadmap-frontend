1. 浅拷贝：
对基本类型来说是深拷贝
对引用类型来说是两个引用，但都指向同一个堆区对象

(1) 扩展运算符（...）
(2) Object.assign()
(3) Array.prototype.slice.call()
const a = [1,2,3,{a:2}]
const b = Array.prototype.slice.call(a)
a[3].a = 3
a[2] = 3.1
console.log('====output====>>>',a);
console.log('====output====>>>',b);

2. 深拷贝：
(1) JSON.parse(JSON.stringify())
const a = {a:1}
const b = JSON.parse(JSON.stringify(a))
a.a=2
console.log('====output====>>>',a);
console.log('====output====>>>',b);

(2) 手写一个实现：
function cloneDeep(obj){
  if(!obj) return obj
  if(typeof obj !=='object'){
    return obj
  }
  if(obj instanceof RegExp){
    return new RegExp(obj)
  }
  const result = new obj.constructor()
  for(let k in obj){
    result[k] = cloneDeep(obj[k])
  }
  return result;
}
const a = {a:{a:2}}
const b = cloneDeep(a);
a.a.a=4
console.log('====output====>>>',a);
console.log('====output====>>>',b);

难点：存在循环引用怎么办：
一个解决：使用一个变量把引用类型存起来，递归时，判断是否存在循环引用
function cloneDeep(obj, weakSet = new WeakSet()){
  if(!obj) return obj
  if(typeof obj !=='object'){
    return obj
  }
  if(obj instanceof RegExp){
    return new RegExp(obj)
  }
  if(weakSet.has(obj)){
    return obj
  }
  weakSet.add(obj)
  const result = new obj.constructor()
  for(let k in obj){
    result[k] = cloneDeep(obj[k],weakSet)
  }
  return result;
}
const obj = {a:{b:2}}
obj.a.c = obj
const b = cloneDeep(obj);
obj.a.b=4
console.log('====output====>>>',obj);
console.log('====output====>>>',b);

WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了




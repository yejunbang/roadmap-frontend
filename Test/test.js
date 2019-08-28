console.log('====output====>>>',new Buffer('test').toString('base64'));


function Person(name) {
  this.name = name
  return name;
}
console.log('====output====>>>',Person.call({},'Tom'));
// let p = new Person('Tom');

function myNew(func,a) {
  let target = {};
  target.__proto__ = func.prototype;
  let res = func.call(target,a);
  console.log('====output===ss=>>>',res);
  if (res && typeof(res) == "object" || typeof(res) == "function") {
    return res;
  }
  return target;
}
console.log('====output====>>>',myNew(Person,'Tom'));
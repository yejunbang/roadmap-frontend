function deepClone(param) {
  if (getType(param) === 'Null' || getType(param) === 'Undefined' || getType(param) === 'Number' || getType(param) === 'String' || getType(param) === 'Boolean') {
    return param;
  }
  let clone
  if (getType(param) === 'Object') {
    clone = {}
  } else if (getType(param) === 'Array') {
    clone = []
  }
  for (let key in param) {
    if (getType(param[key]) === 'Null' || getType(param[key]) === 'Undefined' || getType(param[key]) === 'Number' || getType(param[key]) === 'String' || getType(param[key]) === 'Boolean') {
      clone[key] = param[key]
    } else {
      clone[key] = deepClone(param[key])
    }
  }
  return clone;
}

function getType(param) {
  return Object.prototype.toString.call(param).slice(8, -1)
}

const a1 = 'ss'
const a2 = undefined
const a3 = {
  a: 1
}
const a4 = [1, 2, 3]
const a5 = [{
  a: 1,
  b: undefined,
  c: null
}]
const a6 = {
  b: [{
    a: 1
  }]
}
console.log('====output====>>>', deepClone(a1));
console.log('====output====>>>', deepClone(a2));
console.log('====output====>>>', deepClone(a3));
console.log('====output====>>>', deepClone(a4));
console.log('====output====>>>', deepClone(a5));
console.log('====output====>>>', deepClone(a6));


const b = deepClone(a6)
a6.b = [2]
console.log('====output====>>>', b);
console.log('====output====>>>', a6);


console.log('====output====>>>', "sss".toString());
console.log('====output====>>>', Object.prototype.toString.call([]).slice(8, -1));
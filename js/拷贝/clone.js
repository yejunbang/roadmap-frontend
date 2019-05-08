// 浅拷贝
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

// 1. 直接赋值: let b = a1
// 2. Object.assign({},a3)
//
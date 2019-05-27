// 实现一个经典算法： 1 1 +, 2 2 + 1 -
function push(arr, value) {
  arr.push(value)
}

function pop(arr) {
  if (arr.length > 0) {
    return arr.splice(arr.length - 1, 1)[0]
  }
}

function result(a1, a2, operator) {
  switch (operator) {
  case '-':
    return a1 - a2;
  case '+':
    return a1 + a2;
  case '*':
    return a1 * a2;
  case '/':
    return a1 / a2;
  }
}

function main() {
  let stack = []
  const str = '2 2 + 1 -'
  const arr = str.split(' ')
  arr.forEach(item => {
    const number = parseInt(item, 10);
    if (isNaN(number)) {
      const a1 = pop(stack)
      const a2 = pop(stack)
      push(stack, result(a2, a1, item))
    } else {
      push(stack, number);
    }
  })
  console.log('====output====>>>', pop(stack));
}
main();
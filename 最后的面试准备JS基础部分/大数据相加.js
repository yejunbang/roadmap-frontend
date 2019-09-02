写一个函数处理大数据的相加问题， 所谓的大数据是指超出了整型， 长整型之类的常规数据类型表示范围的数据


function add(str1, str2) {
  let strArr1 = str1.split('')
  let strArr2 = str2.split('')

  // 全转为数字
  for (let i = 0; i < strArr1.length; i++) {
    strArr1[i] = parseInt(strArr1[i], 10)
  }
  for (let i = 0; i < strArr2.length; i++) {
    strArr2[i] = parseInt(strArr2[i], 10)
  }

  let result = []

  let carry = 0
  strArr1.reverse()
  strArr2.reverse()
  let minLen = strArr1.length > strArr2.length ? strArr2.length : strArr1.length
  for (let i = 0; i < minLen; i++) {
    let sum = strArr1[i] + strArr2[i] + carry
    if (sum > 9) {
      result.push(sum - 10)
      carry = 1
    } else {
      result.push(sum)
      carry = 0
    }
  }
  let maxArr = strArr1.length > strArr2.length ? strArr1 : strArr2
  for (let i = minLen; i < maxArr.length; i++) {
    let sum = maxArr[i] + carry
    if (sum > 9) {
      result.push(sum - 10)
      carry = 1
    } else {
      result.push(sum)
      carry = 0
    }
  }
  return (result.reverse()).join('')
}

console.log('====output====>>>>', add("1200000000000000000000000000000000","140000000000001452"));
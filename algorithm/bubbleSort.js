function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let flag = false;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = true
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
    if (!flag) {
      break
    }
  }
}
const arr = [3, 6, 1, 8, 4, 9, 7, 0, 2, 22, 45, 400]
const arrcopy = [3, 6, 1, 8, 4, 9, 7, 0, 2, 22, 45, 400]
bubbleSort(arr)
console.log('result=====', arr);
console.log('real=======', arrcopy.sort((a, b) => a - b));
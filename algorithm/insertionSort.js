function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let value = arr[i]
    let j = i - 1
    for (; j >= 0; j--) {
      if (arr[j] > value) {
        arr[j + 1] = arr[j]
      } else {
        break
      }
    }
    arr[j + 1] = value
  }
}

const arr = [3, 6, 1, 8, 4, 9, 7, 0, 2, 22, 45, 400]
const arrcopy = [3, 6, 1, 8, 4, 9, 7, 0, 2, 22, 45, 400]
insertionSort(arr)
console.log('result=====', arr);
console.log('real=======', arrcopy.sort((a, b) => a - b));
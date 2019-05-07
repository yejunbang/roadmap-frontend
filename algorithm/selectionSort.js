function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      const temp = arr[i]
      arr[i] = arr[minIndex]
      arr[minIndex] = temp
    }
  }
}
const arr = [3, 6, 1, 8, 4, 9, 7, 0, 2, 22, 45, 400]
const arrcopy = [3, 6, 1, 8, 4, 9, 7, 0, 2, 22, 45, 400]
selectionSort(arr)
console.log('result=====', arr);
console.log('real=======', arrcopy.sort((a, b) => a - b));
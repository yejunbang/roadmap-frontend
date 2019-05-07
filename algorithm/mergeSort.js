// 1. arr[p...q], arr[q+1...r]
// 2. left<right
function mergeSort(arr, left, right) {
  if (left >= right) return
  let q = parseInt((left + right) / 2)
  mergeSort(arr, left, q)
  mergeSort(arr, q + 1, right)
  mergeArr(arr, left, q, right)
}

function mergeArr(arr, left, mid, right) {
  let temp = []
  let q = mid + 1
  let p = left
  let k = 0
  while (p <= mid && q <= right) {
    if (arr[p] <= arr[q]) {
      temp[k++] = arr[p++]
    } else {
      temp[k++] = arr[q++]
    }
  }
  while (p <= mid) {
    temp[k++] = arr[p++]
  }
  while (q <= right) {
    temp[k++] = arr[q++]
  }
  for (let i = 0; i < k; i++) {
    arr[i + left] = temp[i]
  }
}

const arr = [3, 21, 4, 5, 3, 2, 4, 3, 5, 35, 5]
mergeSort(arr, 0, arr.length - 1)
console.log('result=====', arr);
console.log('real=======', arr.sort((a, b) => a - b));
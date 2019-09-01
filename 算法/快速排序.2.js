function quickSort(arr, left, right) {
  if (left > right) return
  let position = getPosition(arr, left, right)
  quickSort(arr, left, position - 1)
  quickSort(arr, position + 1, right)
}

function getPosition(arr, left, right) {
  let pivot = arr[left]
  while (left < right) {
    while (left < right && pivot <= arr[right]) {
      right--
    }
    arr[left] = arr[right]
    while (left < right && pivot >= arr[left]) {
      left++
    }
    arr[right] = arr[left]
  }
  arr[left] = pivot
  return left
}

const arr = [3, 6, 1, 8, 4, 9, 7, 0, 2, 22, 45, 400]
const arrcopy = [3, 6, 1, 8, 4, 9, 7, 0, 2, 22, 45, 400]
quickSort(arr, 0, arr.length - 1)
console.log('result=====', arr);
console.log('real=======', arrcopy.sort((a, b) => a - b));
时间复杂度：平均：O(nlogn) 最好：O(nlogn) 最坏：O(n^2)
空间复杂度：O(logn)
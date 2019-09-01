function quickSort(arr, left, right) {
  if (left >= right) return
  let index = getPoition(arr, left, right)
  quickSort(arr, left, index - 1)
  quickSort(arr, index + 1, right)
}

function getPoition(arr, left, right) {
  let pivot = arr[right]
  let i = left
  for (let j = left; j <= right - 1; j++) {
    if (arr[j] < pivot) {
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
      i++
    }
  }
  const temp = arr[i]
  arr[i] = arr[right]
  arr[right] = temp
  return i
}

const arr = [3, 6, 1, 8, 4, 9, 7, 0, 2, 22, 45, 400]
const arrcopy = [3, 6, 1, 8, 4, 9, 7, 0, 2, 22, 45, 400]
quickSort(arr, 0, arr.length - 1)
console.log('result=====', arr);
console.log('real=======', arrcopy.sort((a, b) => a - b));
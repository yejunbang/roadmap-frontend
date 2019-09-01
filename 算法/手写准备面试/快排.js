function quickSort(arr, low, height) {
  if (low > height) return
  const pivot = getPosition(arr, low, height)
  quickSort(arr, low, pivot - 1)
  quickSort(arr, pivot + 1, height)
}

function getPosition(arr, low, height) {
  const pivot = arr[low]
  while (low < height) {
    while (low < height && arr[height] >= pivot) {
      height--
    }
    arr[low] = arr[height]
    while (low < height && arr[low] <= pivot) {
      low++
    }
    arr[height] = arr[low]
  }
  arr[low] = pivot
  return low
}

const arr = [3, 6, 1, 6, 5, 89, 5, 2, 64, 2, 1, 4]
quickSort(arr, 0, arr.length - 1);
console.log('====output====>>>>', arr);
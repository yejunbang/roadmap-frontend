function shellSort(arr) {
  let gap = 1;
  while (gap < arr.length / 3) {
    gap = gap * 3 + 1
  }
  let temp
  for (; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < arr.length; i++) {
      let j = i - gap
      temp = arr[i]
      for (; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  return arr
}

const arr = [3, 6, 1, 6, 5, 89, 5, 2, 64, 2, 1, 4]
console.log('====output====>>>>', shellSort(arr));

时间复杂度：平均：O(nlogn) 最好，最坏：O(n log^2(n))
空间复杂度：O(1)
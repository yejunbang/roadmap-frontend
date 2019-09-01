// 使用哨兵的实现:
function mergeSort(arr) {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++])
    } else {
      result.push(right[j++])
    }
  }
  while (i < left.length) {
    result.push(left[i++])
  }
  while (j < right.length) {
    result.push(right[j++])
  }
  return result
}

const arr = [3, 6, 1, 6, 5, 89, 5, 2, 64, 2, 1, 4]
console.log('====output====>>>>', mergeSort(arr));
时间复杂度：平均：O(nlogn) 最好，最坏：O(nlogn)
空间复杂度：O(n)
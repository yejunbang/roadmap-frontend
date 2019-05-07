// 使用哨兵的实现:
function mergeSort(arr, left, right) {
  if (left > right) return
  let q = parseInt((left + right) / 2)
  mergeSort(arr, left, q)
  mergeSort(arr, q + 1, right)
  mergeArr(arr, left, q, right)
}

function mergeArr(arr, left, mid, right) {

}
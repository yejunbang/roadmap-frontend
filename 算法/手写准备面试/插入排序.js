function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const value = arr[i]
    let j = i - 1
    for (; j >= 0; j--) {
      if (value < arr[j]) {
        arr[j + 1] = arr[j]
      } else {
        break;
      }
    }
    arr[j + 1] = value
  }
}

const arr = [3, 6, 1, 6, 5, 89, 5, 2, 64, 2, 1, 4]
insertSort(arr)
console.log('====output====>>>>', arr);
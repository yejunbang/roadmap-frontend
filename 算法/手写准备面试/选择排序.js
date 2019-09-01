function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j
      }
    }
    if (min !== i) {
      const temp = arr[min]
      arr[min] = arr[i]
      arr[i] = temp
    }
  }
}

const arr = [3, 6, 1, 6, 5, 89, 5, 2, 64, 2, 1, 4]
selectSort(arr)
console.log('====output====>>>>', arr);
vue: 事件总线
const bus = new Vue()
bus.on('custom', function (data) {
  console.log('====output====>>>>', data);
})
bus.$emit('custom', 'haha')
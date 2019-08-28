const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('test')
  }, 1000)
})
p.then(result=>{
  console.log('====output====>>>',result);
  return result
}).finally(()=>{
  console.log('====output====>>>finally');
}).then(result=>{
  console.log('====output====>>>',result);
})
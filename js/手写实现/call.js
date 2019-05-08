Function.prototype.myCall = function (content) {
  if (!content) {
    content = typeof window === 'undefined' ? global : window;
  }
  content.fn = this
  const args = [...arguments].slice(1)
  const result = content.fn(...args)
  delete content.fn
  return result
}

name = 'windows'

function father(age) {
  console.log('====output==name==>>>', this.name);
  console.log('====output==age==>>>', age);
}

father.myCall();
father.myCall({
  name: 'son'
}, 20);
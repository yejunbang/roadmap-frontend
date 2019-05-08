Function.prototype.myApply = function (content, rest) {
  if (!content) {
    content = typeof window === 'undefined' ? global : window
  }
  content.fn = this
  let result
  if (rest === undefined || rest === null) {
    result = content.fn(rest)
  } else {
    result = content.fn(...rest)
  }
  delete content.fn;
  return result;
}

name = 'windows'

function father(age) {
  console.log('====output==name==>>>', this.name);
  console.log('====output==age==>>>', age);
}

father.myApply();
father.myApply({
  name: 'son'
}, [20]);
import _ from 'lodash';
import './style.css'
import MyImages from './test.jpg'
import Data from './data.xml'

function component() {
  let element = document.createElement('div');

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello')
  const image = new Image()
  image.src = MyImages;
  element.appendChild(image)

  console.log('====output====>>>', Data);
  return element;
}

document.body.appendChild(component());
import _ from 'lodash';
import printMe from './print.js';

function component() {
  let element = document.createElement('div');
  var btn = document.createElement('button');

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello')
  btn.innerHTML = '点击这里，然后查看 console！';
  btn.onclick = printMe;

  element.appendChild(btn);
  return element;
}

document.body.appendChild(component());
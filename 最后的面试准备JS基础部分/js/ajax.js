原生手写XHR
let xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () {
  // xhr.readyState是浏览器判断请求过程中各个阶段的
  // xhr.status是 HTTP 协议中规定的不同结果的返回状态说明
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log('====output====>>>', xhr.responseText);
  }
}
xhr.open('GET', '/users/user', false)
xhr.send(null)
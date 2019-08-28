// 原始配置
function setRem () {
  let doc = document.documentElement
  let width = doc.getBoundingClientRect().width
  // 假设设计稿为宽750，则1rem代表10px
  let rem = width / 75
  doc.style.fontSize = rem + 'px'
}
// 监听窗口变化
addEventListener("resize", setRem)

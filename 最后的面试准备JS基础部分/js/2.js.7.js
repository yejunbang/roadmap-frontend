1. js异步加载的方式有哪些？
<script> 的 defer 属性，HTML4 中新增
<script> 的 async 属性，HTML5 中新增
<script>标签打开defer属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。
defer 和 async 的区别在于: defer要等到整个页面在内存中正常渲染结束，才会执行；
async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。defer是“渲染完再执行”，async是“下载完就执行”。
如果有多个 defer 脚本，会按照它们在页面出现的顺序加载。
多个async脚本是不能保证加载顺序的。

动态插入 script 脚本
function downloadJS() { 
    varelement = document.createElement("script"); 
    element.src = "XXX.js"; 
    document.body.appendChild(element); 
}
//何时的时候，调用上述方法 

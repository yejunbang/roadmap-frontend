https://mp.weixin.qq.com/s/dV4gLMloCwU8zMCgMi0MDw
https://mp.weixin.qq.com/s/PNJ7xCTh15vtdFHWlDk5gw

DOM tree ---> CSSOM --->Render tree(渲染树) ---> layout(布局) ---> paint(渲染)

一般来说DOM tree和CSSOM是同步构建的，但当遇到<script>标签，DOM tree的构建会阻塞， 因为JS可以操作DOM，也可以操作CSS，
此时会等待CSSOM的下载和构建，再执行JS，最后从阻塞的地方开始继续构建DOM（CSSOM也会阻塞DOM构建）
只要浏览器遇到 script 标记，唤醒 JavaScript解析器，就会进行暂停 (blocked )浏览器解析HTML，并等到 CSSOM 构建完毕，才去执行js脚本
CSSOM 1s， DOM 1s， JS：0.0001s
没有JS时：总共花费1s（同步执行）
有JS时：总共花费2.0001s

Render tree: 只构建可见内容，display: none不会构建

layout：弄清楚各个节点在页面中的位置大小，相对尺寸会转化为绝对像素

paint：将渲染树转换成屏幕上的像素，将内容显示在屏幕上

回流(reflow): 当浏览器发现某个部分发生变化，影响布局，需要倒回去重新渲染。
一个节点的回流(reflow)可能会导致字节点，父节点，兄弟节点的回流，代价大
但是不可避免：只要这些行为引起了页面上某些元素的占位面积、定位方式、边距等属性的变化，都会引起它内部、周围甚至整个页面的重新渲染
display:none 会触发 reflow

重绘(repaint)：改变某个元素的背景色、文字颜色、边框颜色等等不影响它周围或内部布局的属性时，屏幕的一部分要重画，但是元素的几何尺寸没有变。
visibility:hidden 只会触发 repaint


存在的问题：
阻塞的 CSS 资源时，浏览器会延迟 JavaScript 的执行和 DOM 构建。另外：
当浏览器遇到一个 <script> 标记时，DOM 构建将暂停，直至脚本完成执行。
JavaScript 可以查询和修改 DOM 与 CSSOM。
CSSOM 构建时，JavaScript 执行将暂停，直至 CSSOM 就绪。

所以，script 标签的位置很重要。实际使用时，可以遵循下面两个原则：
CSS 优先：引入顺序上，CSS 资源先于 JavaScript 资源。
JavaScript 应尽量少影响 DOM 的构建。

优化：
精简 CSS 并尽快提供它。除此之外，还可以用媒体类型（media type）和媒体查询（media query）来解除对渲染的阻塞
通常会把css放在头部，js放在body尾
JS如果没有 defer 或 async，浏览器会立即加载并执行指定的脚本。defer和async会使 script 异步加载，但对于 inline-script 都是无效的，需要<script src=''>
defer: 载入 JavaScript 文件时不阻塞 HTML 的解析，执行阶段被放到 HTML 标签解析完成之后。可以保证执行顺序
async: 如果已经加载好，就会开始执行，无论此刻是 HTML 解析阶段, 谁先加载完谁执行，不能保证执行顺序
document.createElement 创建的 script 默认是异步
长耗时的JS代码放到Web Workers中执行

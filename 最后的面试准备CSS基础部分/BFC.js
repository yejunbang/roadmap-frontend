BFC: 块格式化上下文


创建方法：
1. 根元素或其它包含它的元素；
2. 浮动 (元素的float不为none)；
3. 绝对定位元素 (元素的position为absolute或fixed)；
4. 行内块inline-blocks(元素的 display: inline-block)；
5. 表格单元格(元素的display: table-cell，HTML表格单元格默认属性)；
6. overflow的值不为visible的元素；
7. 弹性盒 flex boxes (元素的display: flex或inline-flex)；


作用：
1. 防止margin重叠
2. 清除浮动




















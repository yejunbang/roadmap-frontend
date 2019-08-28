# 转自[50道CSS面试题](https://segmentfault.com/a/1190000013325778)

1. 介绍一下标准的CSS的盒子模型？与低版本IE的盒子模型有什么不同的？
  - 标准盒模型：总宽度 = 内容宽度 + border + padding + margin;  内容宽度(css中的width) = content  
  - IE盒模型： 总宽度 =  内容宽度 + margin; 内容宽度(css中的width) = content + border + padding

2. box-sizing属性：
  控制盒子模式，默认为content-box: 标准盒模型
  有两个属性：content-box, border-box;

3. CSS选择器有哪些？
 - id选择器
 - 类选择器
 - 标签选择器
 - 子选择器（ul>li）
 - 后代选择器 (ul li)
 - 相邻元素选择器 (h1 + p)
 - 通配符选择器 (*)
 - 属性选择器 (input[type='text'])
 - 伪类选择器 (a:hover, li:nth-child)
优先级： !important > [id>class>tag]
!important比内联优先级高

3.1 哪些属性可以继承？
 font-size, font-family, color

4. CSS优先级如何计算？
- 行内样式 1000
- id选择器 100
- 类选择器, 属性选择器，伪类 10
- 元素选择器 (h1)， 伪元素(::before) 1  
但有!important时，都为它。

5. CSS3新增伪类有哪些？  
- p:first-of-type 选择属于其父元素的首个元素  
- p:last-of-type 选择属于其父元素的最后元素  
- p:only-of-type 选择属于其父元素唯一的元素
- p:only-child 选择属于其父元素的唯一子元素
- p:nth-child(2) 选择属于其父元素的第二个子元素
- :enabled :disabled 表单控件的禁用状态。
- :checked 单选框或复选框被选中。

6. 如何居中div？如何居中一个浮动元素？如何让绝对定位的div居中？  
div:
```
border: 1px solid red;
margin: 0 auto; 
height: 50px;
width: 80px;
```
浮动元素的上下左右居中：
```
border: 1px solid red;
float: left;
position: absolute;
width: 200px;
height: 100px;
left: 50%;
top: 50%;
margin: -50px 0 0 -100px; 
```
绝对定位的div居中（水平居中）：
```
border: 1px solid black;
position: absolute;
width: 200px;
height: 100px;
margin: 0 auto;
left: 0;
right: 0; 
```
另有flex

7. display有哪些值？说明他们的作用?
- inline（默认）--内联
- none--隐藏
- block--块显示
- table--表格显示
- list-item--项目列表
- inline-block

8. position的值？
- static（默认）：按照正常文档流进行排列；
- relative（相对定位）：不脱离文档流，参考自身静态位置通过 top, bottom, left, right 定位；
- absolute(绝对定位)：参考距其最近一个不为static的父级元素通过top, bottom, left, right 定位；
- fixed(固定定位)：所固定的参照对像是可视窗口。
- sticky(粘性定位): 粘性定位，该定位基于用户滚动的位置。它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置

9. CSS3有哪些新特性?
RGBA和透明度

10. 请解释一下CSS3的flexbox（弹性盒布局模型）,以及适用场景？
该布局模型的目的是提供一种更加高效的方式来对容器中的条目进行布局、对齐和分配空间。在传统的布局方式中，block 布局是把块在垂直方向从上到下依次排列的；而 inline 布局则是在水平方向来排列。弹性盒布局并没有这样内在的方向限制，可以由开发人员自由操作

11. 用纯CSS创建一个三角形的原理是什么？
```
width: 0;
height: 0;
border-top: 40px solid transparent;
border-left: 40px solid transparent;
border-right: 40px solid transparent;
border-bottom: 40px solid #ff0000;
```

12. 一个满屏品字布局如何设计?
第一种真正的品字：

三块高宽是确定的；
上面那块用margin: 0 auto;居中；
下面两块用float或者inline-block不换行；
用margin调整位置使他们居中。
第二种全屏的品字布局:
上面的div设置成100%，下面的div分别宽50%，然后使用float或者inline使其不换行。

13. 常见的兼容性问题？
- 不同浏览器的标签默认的margin和padding不一样。
 *{margin:0;padding:0;}
- IE6双边距bug：块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大。hack：- display:inline;将其转化为行内属性。
- 渐进识别的方式，从总体中逐渐排除局部。首先，巧妙的使用“9”这一标记，将IE浏览器从所有情况中分离出- 来。接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。
```
{
background-color:#f1ee18;/*所有识别*/
.background-color:#00deff\9; /*IE6、7、8识别*/
+background-color:#a200ff;/*IE6、7识别*/
_background-color:#1e0bd1;/*IE6识别*/
}
```
- 设置较小高度标签（一般小于10px），在IE6，IE7中高度超出自己设置高度。hack：给超出高度的标签设置- overflow:hidden;或者设置行高line-height 小于你设置的高度。
- IE下，可以使用获取常规属性的方法来获取自定义属性,也可以使用getAttribute()获取自定义属性；- Firefox下，只能使用getAttribute()获取自定义属性。解决方法:统一通过getAttribute()获取自定义属- 性。
- Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 - -webkit-text-size-adjust: none; 解决。
- 超链接访问过后hover样式就不出现了，被点击访问过的超链接样式不再具有hover和active了。解决方法是- 改变CSS属性的排列顺序:L-V-H-A ( love hate ): a:link {} a:visited {} a:hover {} a:active - {}

14. 为什么要初始化CSS样式
因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

15. absolute的containing block(容器块)计算方式跟正常流有什么不同？

无论属于哪种，都要先找到其祖先元素中最近的 position 值不为 static 的元素，然后再判断：

若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形；
否则,则由这个祖先元素的 padding box 构成。
如果都找不到，则为 initial containing block。

补充：

static(默认的)/relative：简单说就是它的父元素的内容框（即去掉padding的部分）
absolute: 向上找最近的定位为absolute/relative的元素
fixed: 它的containing block一律为根元素(html/body)

16. CSS里的visibility属性有个collapse属性值？在不同浏览器下以后什么区别？

当一个元素的visibility属性被设置成collapse值后，对于一般的元素，它的表现跟hidden是一样的。

chrome中，使用collapse值和使用hidden没有区别。
firefox，opera和IE，使用collapse值和使用display：none没有什么区别。

> collapse: 当在表格元素中使用时，此值可删除一行或一列，但是它不会影响表格的布局。被行或列占据的空间会留给其他内容使用。如果此值被用在其他的元素上，会呈现为 "hidden"。

17. display:none与visibility：hidden的区别？

display：none 不显示对应的元素，在文档布局中不再分配空间（回流+重绘）
visibility：hidden 隐藏对应元素，在文档布局中仍保留原来的空间（重绘）

18. position跟display、overflow、float这些特性相互叠加后会怎么样？

display属性规定元素应该生成的框的类型；position属性规定元素的定位类型；float属性是一种布局方式，定义元素在哪个方向浮动。
类似于优先级机制：position：absolute/fixed优先级最高，有他们在时，float不起作用，display值需要调整。float 或者absolute定位的元素，只能是块元素或表格。

19. 对BFC规范(块级格式化上下文：block formatting context)的理解？

BFC规定了内部的Block Box如何布局。
定位方案：

- 内部的Box会在垂直方向上一个接一个放置。
- Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。
- 每个元素的margin box 的左边，与包含块border box的左边相接触。
- BFC的区域不会与float box重叠。
- BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。
- 计算BFC的高度时，浮动元素也会参与计算。  
满足下列条件之一就可触发BFC

- 根元素，即html
- float的值不为none（默认）
- overflow的值不为visible（默认）
- display的值为inline-block、table-cell、table-caption
- position的值为absolute或fixed

20. 为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？
浮动元素碰到包含它的边框或者浮动元素的边框停留。由于浮动元素不在文档流中，所以文档流的块框表现得就像浮动框不存在一样。浮动元素会漂浮在文档流的块框上。
浮动带来的问题：

父元素的高度无法被撑开，影响与父元素同级的元素
与浮动元素同级的非浮动元素（内联元素）会跟随其后
若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。
清除浮动的方式：

父级div定义height
最后一个浮动元素后加空div标签 并添加样式clear:both。
包含浮动元素的父标签添加样式overflow为hidden或auto。
父级div定义zoom

















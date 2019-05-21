# 入门
1. 
```
<canvas id='canvas'></canvas>
```
如果不设置其他，默认会创建一个宽300*150的画布

2. 设置画布的大小：
- HTML 设置 width、height；
- CSS 设置 width、height；
- JS 动态设置 width、height；

由于在CSS 中设置宽高，画布就会按照 300 * 150 的比例进行缩放，也就是将 300 * 150 的页面显示在 400 * 400 的容器中，画布中的内容会拉伸  
**一般选择HTML，JS方式设置画布大小**
```
HTML: <canvas id='canvas' width='400' height='400'>
JS: 
  var canvas = document.getElementById('canvas');
  canvas.width=400;
  canvas.height=400;
```

3. 获取canvas的上下文：
```
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
```

4. 绘制路径：
全部方法：忘记了回来查
  - fill()：填充路径
  - stroke()：描边
  - arc()：创建圆弧
  - rect()：创建矩形
  - fillRect()：绘制矩形路径区域
  - strokeRect()：绘制矩形路径描边
  - clearRect()：在给定的矩形内清除指定的像素
  - arcTo()：创建两切线之间的弧/曲线
  - beginPath()：起始一条路径，或重置当前路径
  - moveTo()：把路径移动到画布中的指定点，不创建线条
  - lineTo()：添加一个新点，然后在画布中创建从该点到最后指定点的线条
  - closePath()：创建从当前点回到起始点的路径
  - clip()：从原始画布剪切任意形状和尺寸的区域
  - quadraticCurveTo()：创建二次方贝塞尔曲线
  - bezierCurveTo()：创建三次方贝塞尔曲线
  - isPointInPath()：如果指定的点位于当前路径中，则返回 true，否则返回 false

一般可以总结为：  
开始一个路径（beginPath():起始一条路径，或重置当前路径）--->绘制路径--->关闭路径（closePath():创建从当前点回到起始点的路径）

注意：
- 如果没有 moveTo，那么第一次 lineTo 的就视为 moveTo
- 每次 lineTo 后如果没有 moveTo，那么下次 lineTo 的开始点为前一次 lineTo 的结束点


5. 把canvas作为背景：position: absolute;z-index:-2;
```
<canvas id='canvas' style='position: absolute;z-index:-2;'></canvas>
```







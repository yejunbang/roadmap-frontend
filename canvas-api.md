详情文档[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)
## x, y坐标, width和height宽高
- fillRect(x, y, width, height): 绘制一个填充的矩形
- strokeRect(x, y, width, height): 绘制一个矩形的边框
- clearRect(x, y, width, height): 清除指定矩形区域，让清除部分完全透明。
## 绘制路径
1. 首先，你需要创建路径起始点。： beginPath()
2. 然后你使用画图命令去画出路径。
3. 之后你把路径封闭。： closePath() (不是必需的)
4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。 stroke()(绘制图形轮廓)/fill()(填充路径的内容区域生成实心的图形)
> 注意：当你调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合

- moveTo(x, y)： 将笔触移动到指定的坐标x以及y上。
- lineTo(x, y)： 绘制一条从当前位置到指定x以及y位置的直线。
- 
- arc(x, y, radius, startAngle, endAngle, anticlockwise)： （x,y坐标）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。（true时，是逆时针方向，false为顺时针方向）
- arcTo(x1, y1, x2, y2, radius)： 根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点
> 注意：arc()函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式:
弧度=(Math.PI/180)*角度。
- 
- quadraticCurveTo(cp1x, cp1y, x, y): 绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
- bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y): 三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
- 
- rect(x, y, width, height)： 绘制矩形，绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。
- 

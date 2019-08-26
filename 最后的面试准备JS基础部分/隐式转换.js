==：
首先判断两者类型是否相同，如果相等，判断值是否相等.
如果类型不同，进行类型转换
判断比较的是否是 null 或者是 undefined, 如果是, 返回 true .
判断两者类型是否为 string 和 number, 如果是, 将字符串转换成 number
判断其中一方是否为 boolean, 如果是, 将 boolean 转为 number 再进行判断
判断其中一方是否为 object 且另一方为 string、number 或者 symbol , 如果是, 将 object 转为原始类型再进行判断

都转为number的哦
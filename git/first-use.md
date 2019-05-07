# 第一次使用：
1. 设置Git的user name和email：
```
$ git config --global user.name "name"
$ git config --global user.email "name@qq.com"
``` 

2. 生成密钥  
`$ ssh-keygen -t rsa -C "humingx@yeah.net"`  
连续3个回车。如果不需要密码的话。  
最后得到了两个文件：id_rsa和id_rsa.pub。

3. 添加密钥到ssh-agent (可以不需要)

> 确保 ssh-agent 是可用的。ssh-agent是一种控制用来保存公钥身份验证所使用的私钥的程序，其实ssh-agent就是一个密钥管理器，运行ssh-agent以后，使用ssh-add将私钥交给ssh-agent保管，其他程序需要身份验证的时候可以将验证申请交给ssh-agent来完成整个认证过程。

启动ssh-agent
```
# start the ssh-agent in the background
eval "$(ssh-agent -s)"
Agent pid 59566
```
添加生成的 SSH key 到 ssh-agent。  
```
$ ssh-add ~/.ssh/id_rsa
```

4. 登陆Github, 添加 ssh 。
把id_rsa.pub文件里的内容复制到github的SSH Keys上

5. 测试：
```
$ ssh -T git@github.com
```
选择 yes，将会看到：
```
Hi xxxxx! You've successfully authenticated, but GitHub does not provide shell access.
```
如果看到Hi后面是你的用户名，就说明成功了。

6. 修改.git文件夹下config中的url。
修改前:
```
[remote "origin"]
url = https://github.com/humingx/humingx.github.io.git
fetch = +refs/heads/*:refs/remotes/origin/*
```
修改后:
```
[remote "origin"]
url = git@github.com:humingx/humingx.github.io.git
fetch = +refs/heads/*:refs/remotes/origin/*
```
7. 发布
git push origin master
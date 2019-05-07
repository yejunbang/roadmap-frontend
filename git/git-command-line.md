# git 基本的command line
- 创建一个新仓库 – git init
- 检查状态 – git status  
反馈给我们仓库当前状态的信息：是否为最新代码，有什么更新等等
如有文件hello.md尚未跟踪，这是说这个文件是新的, 需要暂存它
- 暂存 – git add  
git add hello.md  --- 指定文件  
git add -A  --- 提交目录下所有的文件

- 提交 – git commit  
一次提交代表着我们的仓库到了一个新的状态，就像是一个快照  
git commit -m "Initial commit."  --- 提交的描述信息


==========================================================================


- 链接远程仓库 – git remote add  
把本地仓库链接到Github上
$ git remote add origin https://github.com/yejunbang/roadmap-frontend.git  --- 主要的远程仓库被称为origin, 也可以是其他

- 上传到服务器 – git push  
git push命令有两个参数，远程仓库的名字，以及分支的名字：  
git push origin master 

- 从服务器上获得修改 – git pull  
git pull拉取远程库最新的内容  
git pull origin master 


==========================================================================

- 创建新分支 – git branch  
每一个仓库的默认分支都叫master, 创建新分支可以用git branch <name>命令：
 git branch mybranch
 新branch目前和master分支是一样的内容。

- 查看分支 – git branch

- 切换分支 – git checkout
切换当前活跃分支

- 合并分支 – git merge  
在新分支mybranch上新建一个文件new.md提交到远程，再切换到master分支，会发现new.md不见了，因为在mybranch分支上，此时使用git merge mybranch，把mybranch分支合并到master分支上，master分支是最新

- 删除分支
git branch -d mybranch


==========================================================================

- 回滚某个文件到之前的版本 – git checkout
git checkout 09bd8cc1 hello.txt
## 命令行运行airtest脚本

在编辑器 airtestIDE中运行脚本，会在log窗口中显示对应的命令，可以直接复制命令到 终端中运行；

### 运行脚本方法
例子：
```shell
"/Applications/AirtestIDE.app/Contents/MacOS/AirtestIDE" 
runner 
"/Users/yulonglee/airtest/家选全款下单.air"  
--device Android://127.0.0.1:5037/eaf8aa24 
--log "/var/folders/x1/46k8gp395m3d83xfbl6wzlbh0000gn/T/AirtestIDE/scripts/94384724a7e246bfccf9e44c00410a3b"
```

1. 可以将IDE的命令添加到全局， *alias airtestIDE=/Applications/AirtestIDE.app/Contents/MacOS/AirtestIDE*
2. runner后面为脚本的位置
3. --devive后面是连接设备的信息
4. --log后面是运行时产生的log文件目录，如果为空时，默认会存放在脚本的目录

实例
```shell
airtestIDE runner /Users/yulonglee/airtest/家选全款下单.air --device Android://127.0.0.1:5037/eaf8aa24 --log /Users/yulonglee/Desktop/123456
```

可以在命令行查看脚本运行结果；

### 生成报告 

运行脚本时存储了运行的log文件，可以使用airtest提供的方法生成 html 视图报告或者 mp4 视频文件;

同理命令可以直接在 IDE 中 使用快捷键  **command + L** 生成报告，log日志中会有对应的命令；

```shell
/Applications/AirtestIDE.app/Contents/MacOS/AirtestIDE  # 命令
reporter /Users/yulonglee/airtest/家选全款下单.air # 脚本目录
--log_root /var/folders/x1/46k8gp395m3d83xfbl6wzlbh0000gn/T/AirtestIDE/scripts/94384724a7e246bfccf9e44c00410a3b # 运行时的日志目录
--outfile /var/folders/x1/46k8gp395m3d83xfbl6wzlbh0000gn/T/AirtestIDE/scripts/94384724a7e246bfccf9e44c00410a3b/log.html  # 要生成的log.html目录
--static_root /Applications/AirtestIDE.app/Contents/MacOS/airtest/report # 静态资源目录, log中引用的公用布局js css等
--lang zh # 语言
--plugin airtest_selenium.report poco.utils.airtest.report # 插件
```
> 由于默认报告是airtest的专属报告，对于poco语句的支持不够完善，因此我们用插件的形式来补充支持poco语句：在你的报告命令行最末尾添加指令 --plugin poco.utils.airtest.report 即可。


可以直接运行：
```shell
airtestIDE reporter /Users/yulonglee/airtest/家选全款下单.air --log_root  /Users/yulonglee/Desktop/123456 --outfile /Users/yulonglee/Desktop/123456/log.html
```
将运行时保存的log生成可视化html文件；

如果需要 将生成的报告导出发给其他人，可以直接在 命令后添加 **--export** 参数来导出报告； 
> 因为生成的log.html中的图片都是绝对路径，所以发给别人的时候，需要重新导出到指定的目录,会在目录下自动引入页面中使用相对路径访问图片和资源文件， 即一个完整的项目文件
```shell
airtestIDE 
reporter /Users/yulonglee/airtest/家选全款下单.air 
--log_root  /Users/yulonglee/Desktop/123456 
--export /Users/yulonglee/Desktop/123456/
```

关于部署导出的日志到服务器

可以使用 --static_root 静态资源目录 参数，来指定静态资源文件的路径（即报告中的css, js等文件）。我们可以将资源文件部署到静态资源文件服务器上，用例如 https://host:port/static/css/ 的路径来访问它，然后在生成报告时，将这个部署出来的服务器地址作为 --static_root 的参数传过去，这样报告中会默认去访问这个URL读取静态资源文件，避免导出报告时重复拷贝这些资源文件造成的磁盘空间占用。
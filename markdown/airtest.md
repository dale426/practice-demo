# UI自动化框架AirTest

Airtest Project的核心成员，是Airtest和Poco两大框架，它们都是Python的第三方库，因此工具编写出来的脚本，本质上都是普通的Python脚本，你可以根据你的需求自由引入其他的Python库。


- Airtest是一个跨平台的、基于图像识别的UI自动化测试框架，适用于游戏和App，支持平台有Windows、Android和iOS。
- Poco是一款基于UI控件识别的自动化测试框架，目前支持Unity3D/cocos2dx-*/Android原生app/iOS原生app/微信小程序，也可以在其他引擎中自行接入poco-sdk来使用。
- AirtestIDE 是一个我们配套推出的跨平台的UI自动化测试编辑器，内置了Airtest和Poco的相关插件功能，能够使用它快速简单地编写脚本。


## airtest 基于图像识别的框架

### 命令参数 touch
  >可以是一个框选界面的区域，或者是一个绝对坐标(x, y)

  如： touch((600, 500), duration=1)

### 滑动swipe， 指定位置进行滑动

  *有两种传入参数的方式*:

  1. swipe(v1, v2=Template(...)) # 从 v1 滑动到 v2
  2. swipe(v1, vector=(x, y)) # 从 v1 开始滑动，沿着vector方向。
    - v1 – 滑动的起点，可以是一个Template图片实例，或是绝对坐标 (x, y)
    - v2 – 滑动的终点，可以是一个Template图片实例，或是绝对坐标 (x, y)
    - vector – 滑动动作的矢量坐标，可以是绝对坐标 (x,y) 或是屏幕百分比，例如 (0.5, 0.5)

### 其他api
https://airtest.readthedocs.io/zh_CN/latest/all_module/airtest.core.api.html#airtest.core.api.touch

### 图像编辑对比功能

  双击代码中的图片，手机页面进入到当前截图的界面，点击 按钮snapshot + Recognition按钮进行截图和对比，会显示红色的线框识识别结果，在窗口的最下面一行会显示 confidence 识别率；

  *参数说明*

  1. threshold(浮点类型)

      设置了图像匹配的阈值，范围是[0.0, 1.0]，默认0.6

  2. target_pos(整型)

      设置了在匹配结果图像上的操作位置，标记点为1-9，默认为5，意思是把匹配的图像九宫格拆分，具体点击的位置；

  3. rgb(bool类型)

      设置在对识别结果进行可信度计算时是否使用rgb三通道，默认为False(即采用灰度图像进行可信对计算)



### 实例代码
```python
# -*- encoding=utf8 -*-
__author__ = "yulonglee"

from airtest.core.api import *

auto_setup(__file__)

def collectionMoney():
    touch(Template(r"tpl1573114449666.png", record_pos=(0.32, 0.582), resolution=(1080, 2160)))
    sleep(3.0)

    for i in range(3):
        swipe((600, 1500), vector=[0.5, -0.8])
        sleep(6.0)
        
    keyevent("BACK")
        
        
def init():
    while True:
        if exists(Template(r"tpl1573113582244.png", record_pos=(0.324, 0.582), resolution=(1080, 2160))):
            collectionMoney()
        else: 
          return
    
init()
    

```

# Poco辅助功能

> Poco 是一种 基于UI识别 的测试框架。AirtestIDE对Poco框架进行了使用支持，提供了UI查看、脚本自动录制等辅助功能。

1. 内置了安卓SDK，可以直接识别渲染 UI树
2. 其他引擎的APP要手动接入对应的SDK

常见问题：

*UI树在一段时间后没有正确刷新？*

可以尝试先将Poco模式选项的下拉菜单改为 Stop，再重新选择你所需要的模式，例如 Android， IDE将重新建立与手机的Poco通信连接。


## 其他

如果手机链接电脑没反应的话， 注意是否使用的原装数据线；
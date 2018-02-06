# 微信小程序
## 1 项目结构
### 1.1 app.json
 app.json时小程序的全局配置，包括了小程序的所有页面路径、界面表现（设置页面背景，文字颜色）、网络超时时间、底部 tab（tabBar为对象，其中list表示展示的导航栏） 等。
#### 1.1.1 pages
  接受一个数组，每一项都是字符串，来指定小程序由哪些页面组成，数组的第一项代表小程序的初始页面。小程序中新增/减少页面，都需要对 pages 数组进行修改（不需要添加文件后缀）。
#### 1.1.2 window
 用于设置小程序的状态栏、导航条、标题、窗口背景色(具体属性参考[开发文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html))
#### 1.1.3 networkTimeout
可以设置各种网络请求的超时时间,包括（request，connectSocket，uploadFile，downloadFile）。
#### 1.1.4 tabBar
配置导航栏，tabBar为对象，list为具体展示导航配置，数据类型为数组，个数最少为2个，最多为5个。定位只能选择top和bottom。当导航定位为底部时，设置的图片文件路径有效果，对于选中与未选中图片展示，只能分别设定不同的图片路径实现。
### 1.2 VXML模板文件
与html文件相似，为描述当前这个页面的结构。小程序封装了一些常用的组件，可以直接使用，常用组件包括文本，按钮，单选框和地图等[点我跳转](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)
VXML中不支持html中的获取节点方法，使用小程序封装的方法进行获取[点我跳转](https://mp.weixin.qq.com/debug/wxadoc/dev/api/wxml-nodes-info.html#wxcreateselectorquery)
### 1.3 WXSS 样式
样式文件，语法与常用css基本一致，但其中还是有几点不同:
1. 新增尺寸单位rpx
![1](./images/rpx.jpg)

2. 小程序支持页面中的样式和全局样式，页面配置的样式优先级更高，而全局中的app.wxss适用于所有符合组件。

3. 此外 WXSS 仅支持部分 CSS 选择器（这点还不是很清楚，id和class支持，可能为高级的nth之类的吧！）

### 1.2 pages
该目录下存放各个页面，每个目录对应一个页面，都有一套自己的配置json，模板VXML，样式WXSS以及逻辑交互JS。其中的page.json只对当前页面有作用。

## 2 生命周期
### 2.1 小程序生命周期函数
![](./images/app.jpg)
*顺便说一下全局变量的使用方式，页面中调用getApp()，获取全局对象，所有的数据都为对象属性*

### 2.2 页面生命周期函数
![](./images/page.jpg)

## 3 页面跳转记录
页面跳转方法有 navigateTo，redirectTo和switchTab。
![](./images/navigate.jpg)

## 4 小程序能力
这个版本的小程序，已经进行了超级进化，不仅对应用开放了更多的权限，而且对于开发者来言变得更加友好。同时还有一个好消息就是，书写时支持es6语法。
### 4.1 支持能力
1. 上传与下载文件可以直接传到开发者服务器，而不像公众号web开发中需要经过微信服务器进行转发处理.[详情点我](https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-file.html#wxuploadfileobject)
2. 支持常规request请求和websocket，单需要注意的时request请求的接口地址必须是支持https证书认证同时需要在小程序后台进行请求安全域名配置，websocket同样需要进行相同的配置，只是接口必须为wxs协议[详情点我](https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-socket.html#wxconnectsocketobject)
3. 多媒体控制，包括语音，视频，录音以及相机，常用的sdk都具备。
4. 支持获取地理位置。
5. 系统信息。包括品牌，型号，像素比，微信版本号，操作系统和基础库版本等。
6. 网络状态，可以识别 wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
7. 加速度计以及罗盘，加速度为三维运动，比如晃动旋转（此处似乎知道手机小黄人晃动，眼睛跟着转动是可以根据这个实现）
8. 拨打电话，传递一个字符串，调用手机拨打电话
9. 控制剪贴板 实现点击复制和获取剪贴板内容。
10. 蓝牙控制，iBeacon控制（这个不知道是什么）和屏幕亮度控制。
11. 用户截屏时间监听
12. 控制手机振动，nfc和wifi。

### 4.2 工具
小程序上传代码后支持预览和体验功能，有两种方式，一种是后台扫描二维码，而另一种则为使用小程序开发助手。当然所有的前提则为你个人微信号对于这个小程序是有权限的。

## 小知识点
1. 地图组件为原生组件，层级为最高，使用绝对定位和zindex是无法实现在地图上覆盖一层。
2. 微信时间选择中，日期与时间是分开的，如果需要同时使用，则需要通过第三方库或者自己实现。
3. 绑定事件中支持常规绑定，使用bind，也可以使用阻止事件冒泡的事件绑定，使用catch绑定。

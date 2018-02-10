//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    query:''
  },
  //事件处理函数
  onLoad: function (option) {
    var that = this
    that.setData({
      query:option.testId
    })
  }
})

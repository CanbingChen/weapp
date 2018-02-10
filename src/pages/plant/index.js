var app = getApp();
Page({
  data:{
    systemInfo:{

    }
  },
  onLoad:function(){
    this.getSystemInfo();
  },
  getSystemInfo:function(){
    console.log('ssssssssss');
    wx.getSystemInfo({
      success: (data) => {
        this.setData({
          systemInfo:data
        });
      },
      fail:(err)=>{
        console.log(err);
      }
    });
  }

});
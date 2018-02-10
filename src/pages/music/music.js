//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    playIndex:null,
    musicPlay:false,
    top5:[],
    swiper:{
        autoplay:true,
        interval:5000
    },
     silder:{
            value:20,
            min:0,
            max:1000,
            step:11,
            showValue:true
    },
    musicList:[],
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  play:function(event){
      var that=this;
      var index=event.currentTarget.dataset.num;
      var music=that.data.musicList[index];
      var isPlay=music.className==='img-block-paused'?false:true;
      if(isPlay){
          that.pauseMusic(index);
      }else{
        that.musicPlayReq(music,index)
      }
    console.log(event);
  },
  pauseMusic:function(index){
      var that=this;
  that.musicPlay=false;
      wx.pauseBackgroundAudio()
        var data=that.data.musicList;
              data[index].className='img-block-paused'
              that.setData({
                  musicList:data
              })
  },
  navigate:function(){
      console.log('测试页面跳转');
      wx.navigateTo({
          url:'/pages/navigate/navigate',
      });
  },
  radomPlay:function(){
      var that=this;
      var musicList=that.data.musicList;
   
      var radom=Math.floor(musicList.length*(Math.random()));
      var music=musicList[radom];
     that.musicPlayReq(music,radom)
  },
  musicPlayReq:function(music,index){
       var that=this;
       that.musicPlay=true;
       wx.playBackgroundAudio({
          dataUrl:music.url,
          title:music.songname,
          coverImgUrl:music.albumpic_small,
          success:function(response){
              var data=that.data.musicList;
              data[index].className='img-block-play'
              that.setData({
                  musicList:data
              })
          },
          fail:function(){
              console.log('音乐播放调用失败');
          },
          complete:function(){
              
          }
      });
  },
  onLoad: function () {
    var that = this
     wx.showToast({
                title:'获取歌单中！',
                mask:true,
                duration:10000,
                icon:'loading',
            });
    wx.onBackgroundAudioPlay(function(){
        wx.getBackgroundAudioPlayerState({
                  success:function(res){
                        console.log(res);                      
                        var silder=that.data.silder;
                        var status = res.status
                        var dataUrl = res.dataUrl
                        var currentPosition = res.currentPosition
                        var duration = res.duration
                        var downloadPercent = res.downloadPercent
                        if(status===2)return
                        silder.value=currentPosition;
                        silder.max=duration
                        that.setData({
                            silder:silder
                        });
                  }
              });  
    });
    console.log(that)
    //调用应用实例的方法获取全局数据
    wx.request({
         url: 'https://route.showapi.com/213-4?showapi_appid=25158&topid=5&showapi_sign=c0d685445898438f8c12ee8e93c2ee74',
          headers: {
        'Content-Type': 'application/json'
        },
        success:function(response){
            wx.hideToast();
            console.log(response.data.showapi_res_body.pagebean.songlist[0]);
            var songList=response.data.showapi_res_body.pagebean.songlist;
            var top5=[];
            for(var i=0;i<5;i++){
                 top5.push(songList[i]);   
            }
            top5.forEach(function(item){
          item.className='img-block-paused';
        })
            that.setData({
                // musicList:songList,
                musicList:top5,
                top5:top5
            });
              
        console.log(that.data.musicList);
        },
        fail:function(response){
            console.log('请求错误！》》》'+response);
        }
    });
  
  }
})

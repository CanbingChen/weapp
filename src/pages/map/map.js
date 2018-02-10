var bmap = require('../../utils/bmap-wx.min.js');
var config = require('../../config/index.js');
const { Bkey } = config.key;
var app = getApp();
var BMap;
var wxMarkerData = [];
Page({
  data: {
    map: {
      longitude: 0,
      latitude: 0,
      scale: 16,
      markers: [],
      height: 'auto',
      polyline: [],
    },
    placeData: {
      title: '',
      address: '',
      telephone: ''
    }
  },
  regionchange(e) {
    console.log(e.type)
  },
  goThere() {
    const source = {
      longitude: this.data.map.longitude,
      latitude: this.data.map.latitude
    };
    wx.navigateTo({
      url: `mapPath?source=${JSON.stringify(source)}&target=${JSON.stringify(this.target)}`,
    })
  },
  markertap(event) {
    var id = event.markerId;
    let target = wxMarkerData[id];
    this.target = {
      latitude: target.latitude,
      longitude: target.longitude
    };
    this.showSearchInfor(wxMarkerData, id);
    this.scaleMarker(wxMarkerData, id);
  },
  showSearchInfor(data, id) {
    this.setData({
      placeData: {
        title: `名称${data[id].title}\n`,
        address: `地址${data[id].address}\n`,
        telephone: `电话${data[id].telephone}`
      }
    });
  },
  scaleMarker(data, id) {
    data.forEach((item, index) => {
      if (index === id) {
        item.iconPath = '../../images/food-checked.png';
      } else {
        item.iconPath = '../../images/food.png';
      }
    });
    this.setData({
      map: {
        ...this.data.map,
        markers: data,
      },
    });
  },
  controltap(e) {
    console.log(e.controlId)
  },
  onLoad: function () {
    var that = this;
    this.target = {};
    BMap = new bmap.BMapWX({
      ak: Bkey
    })
    wx.getLocation({
      type:'gcj02',
      success:(response)=>{
        console.log(response)
        that.setData({
          map:{
            ...this.data.map,
            longitude : response.longitude,
            latitude : response.latitude
          }
        });
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      }
    });
    console.log('地图页面加载成功！！')
  },
  callPhone: function () {
    const { telephone } = this.data.placeData;
    const phone = telephone.substring(2).split(',')[0];
    wx.makePhoneCall({
      phoneNumber: phone,
      success: () => {

      },
      fail: () => {

      }
    });
  },
  search: function (e) {

    var that = this
    //查询失败，直接打印log
    var fail = function (data) {
      console.log(data)
    }

    //查询成功后将结果数据动态绑定到页面上
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      wxMarkerData.forEach(item => {
        item.iconPath = '../../images/food.png';
        // item.height = 0.1;
        //气泡配置
        item.callout = {
          content: item.title,
          bgColor: '#ffffff',
          display: 'ALWAYS',
          padding: 10
        };
      });
      that.setData({
        map: {
          ...that.data.map,
          markers: wxMarkerData,
        },

      })
    }
    BMap.search({
      query: e.target.dataset.type,
      success: success,
      fail: fail
    })
  }
})
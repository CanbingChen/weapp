var gmap = require('../../utils/amap-wx.js');
var config = require('../../config/index.js');
const { Gkey } = config.key;
const GMap = new gmap.AMapWX({ key: Gkey});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[],
    polyline:[],
    distance:'',
    cost:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const source = Object.assign(JSON.parse(options.source ||`{"longitude":116.481028,"latitude":39.989643}`), { iconPath:'../../images/start.png'});
    const target = Object.assign(JSON.parse(options.target ||`{"latitude":39.90816,"longitude":116.434446}`), { iconPath: '../../images/end.png' });
    const markers = [source, target];
    this.setData({
      markers
    });
    GMap.getWalkingRoute({
      origin: `${source.longitude},${source.latitude}`,
      destination: `${target.longitude},${target.latitude}`,
      success:(data)=>{
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps){
          var steps = data.paths[0].steps;
          steps.forEach(step => {
            var polyline = step.polyline.split(';');
            polyline.forEach(line => {
              points.push({
                longitude:parseFloat(line.split(',')[0]),
                latitude: parseFloat(line.split(',')[1])
              });
            });         
          });
        }
        this.setData({
          polyline:[{
            points,
            color:"#0091ff",
            width:6
          }]
        });
        if (data.paths && data.paths[0] && data.paths[0].distance){
          this.setData({
            distance: `${data.paths[0].distance}米`
          });
        }
        if (data.paths && data.paths[0] && data.paths[0].duration) {
          this.setData({
            cost: `${Math.ceil(data.paths[0].duration / 60)}分钟`
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
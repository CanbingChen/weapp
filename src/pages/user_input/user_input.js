var util = require('../../utils/util.js')
var app = getApp()
var date=new Date()
var years=[],months=[],days=[];
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1 ; i <= 12; i++) {
  months.push(i)
}

for (let i = 1 ; i <= 31; i++) {
  days.push(i)
}
Page({
    data:{
        animationData: {},
        years:years,
        months:months,
        days:days,
        citys:['成都','重庆','北京','上海','广州'],
        year:1,
        month:1,
        day:1,
        city:'成都',
        selected:[10,10,1,1],
        checks:[
            {name: 'USA', value: '美国'},
            {name: 'CHN', value: '中国', checked: 'true'},
            {name: 'BRA', value: '巴西'},
            {name: 'JPN', value: '日本'},
            {name: 'ENG', value: '英国'},
        ],
        radios: [
            {name: 'USA', value: '美国'},
            {name: 'CHN', value: '中国', checked: 'true'},
            {name: 'BRA', value: '巴西'},
            {name: 'JPN', value: '日本'},
            {name: 'ENG', value: '英国'},
            {name: 'TUR', value: '法国'},
        ],
        inputValue:'我是初始值',
        range:[{
            city:'成都',
            num:10000
        },{
            city:'北京',
            num:1000
        },{
            city:'重庆',
            num:200
        }],
        dateObj:{
            value:util.formatDate(new Date()),
            start:util.formatDate(new Date(1482537600000)),
            end:util.formatDate(new Date(1485187200000)),
            fields:'day'
        },
        picker:0,
        time:'',
        radio:'CHN',
        silder:{
            value:10,
            min:0,
            max:50,
            step:2,
            showValue:true
        },
        uploadImg:[]
    },
    checkboxChange: function(e) {
        console.log(e);
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    },
    selectorChange:function(event){
        var that=this;
        var index=event.detail.value;
        that.setData({
            picker:index
        });
        console.log(that.data.picker);
        console.log(event)
    },
    formSubmit:function(event){
        var that=this;
        console.log(that.data);
    },
    selectorTimeChange:function(event){
        var that=this;
       
        that.setData({
            time:event.detail.value
        });
        console.log(event);
    },
    chooseImg:function(){
        var that=this;
        console.log('调用选择图片点击事件');
        wx.chooseImage({
            success:function(res){
                var imgList=res.tempFilePaths;
                that.setData({
                    uploadImg:imgList
                });
                var animation = wx.createAnimation({
                    duration: 5000,
                    timingFunction: 'ease',
                });
                animation.scale(0.1,0.1).rotate(360).scale(1,1).step();
                that.setData({
                    animationData:animation.export()
                })
                this.animation = animation
                console.log(imgList);
            }
        });
    },
    selectorDateChange:function(event){
          var that=this;
        var dateObj=that.data.dateObj;
        dateObj.value=event.detail.value
            that.setData({
                dateObj:dateObj
        });
        console.log(that.data.dateObj)
    },
    imageLoad:function(event){
        console.log(event);
    },
    customChange:function(event){
        var that=this;
        var selected=event.detail.value;
        that.setData({
            year:that.data.years[selected[0]],
            month:that.data.months[selected[1]],
            day:that.data.days[selected[2]],
            city:that.data.citys[selected[3]]
        });
        console.log(that.data.year);
    },
    sliderChange:function(event){
                console.log(event);
    },
    inputChange:function(e){
        var that=this;
        console.log(e);
        that.setData({
           inputValue:e.detail.value 
        });
        console.log(that.data.inputValue);
    },
    radioChange:function(event){
        var that=this;
        var selected=event.detail.value;
        that.setData({
            radio:selected
        });
        console.log(event);
    },
    onLoad:function(){
        var that=this;
        var now=new Date();
        // var hours=now.getHours()<10?'0'+
        console.log(now.getHours());
        wx.onAccelerometerChange(function(res) {
            console.log('ccccb');
            console.log(res.x)
            console.log(res.y)
            console.log(res.z)
        })
        that.setData({
            time:'5:20'
        });
    }
})
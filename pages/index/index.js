//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World3123',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],

    // banner
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    // daohang
    daohang:[{
        mode: 'scaleToFill',
        clickUrl: "pages/logs/logs",
        imageUrl: "http://pic.qiantucdn.com/58pic/16/72/48/09758PICdE2_1024.jpg!/fw/1024/watermark/url/L2ltYWdlcy93YXRlcm1hcmsveGlhb3R1LnBuZw==/align/center/crop/0x1024a0a0",
        location: "电影"
    },{
        mode: 'scaleToFill',
        clickUrl:"pages/logs/logs",
        imageUrl: "http://b223.photo.store.qq.com/psb?/V11IoDBE1Ahs0A/*LYQxyJPyIpzfetwcyTegCYWkr1cLpJZIRu0xvwmppg!/c/dN8AAAAAAAAA&bo=AATTAgAAAAABEOI!",
        location: "音乐"
    },{
        mode: 'scaleToFill',
        clickUrl:"pages/logs/logs",
        imageUrl: "http://b389.photo.store.qq.com/psb?/V11IoDBE1Ahs0A/XsdvXB4uJnfq.OAg9hxzCAgyVIDLo7uskbaXoloW1bY!/c/dIUBAAAAAAAA&bo=XgIUAgAAAAABEH0!",
        location: "周边"
    }],

      // 天气
      location: "上海市",
      county: "普陀区",
      today: "2018-7-27",
      weatherData:[{
          tmp:30,
          cond_txt: "多云",
          wind_dir: "微风",
          wind_sc: "东风",
          pm25: "",
          qlty: "",
          txt: "描述"
      }]

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {

        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    //console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');

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
        clickUrl: "pages/movies/movies",
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
      location: "",
      county: "",
      today: "",
      weatherData:{
          tmp:'',
          cond_txt: "",
          wind_dir: "",
          wind_sc: "",
          hum: "",
          txt: "描述"
      },
      dress:{

      }

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
      app.globalData.day = util.formatTime(new Date()).split(' ')[0];
      this.setData({
          today: app.globalData.day
      });
      this.getLocation();

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
  },
    getLocation: function(e){
        let that = this;
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                let latitude = res.latitude
                let longitude = res.longitude
                wx.request({
                    url: `${app.globalData.locationApi}/ws/geocoder/v1/?location=${latitude},${longitude}&key=${app.globalData.tencentMapKey}`,
                    success: res => {
                        app.globalData.defaultCity = app.globalData.defaultCity ? app.globalData.defaultCity:res.data.result.ad_info.city;
                        app.globalData.defaultCounty = app.globalData.defaultCounty ? app.globalData.defaultCounty :res.data.result.ad_info.district;
                        that.setData({
                            location: app.globalData.defaultCity,
                            county: app.globalData.defaultCounty
                        });
                        that.getWeather();
                    }
                })
            }
        })
    },
    getWeather: function (e) {
        var length = this.data.location.length;
        var city = this.data.location.slice(0, length-1); //分割字符串
        var that = this;
        var param = {
            key: app.globalData.heWeatherKey,
            location: city
        };
        //发出请求
        wx.request({
            url: app.globalData.heWeatherBase + "/s6/weather",
            data: param,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                app.globalData.weatherData = res.data.HeWeather6[0].status == "unknown city" ? "" : res.data.HeWeather6[0];
                var weatherData = app.globalData.weatherData ? app.globalData.weatherData.now : "暂无该城市天气信息";
                var dress = app.globalData.weatherData ? res.data.HeWeather6[0].lifestyle[1] : { txt: "暂无该城市天气信息"};
                that.setData({
                    weatherData: weatherData, //今天天气情况数组
                    dress: dress //生活指数
                });
            }
        })
    },
    //点击更改定位切换到城市页面
    jump: function () {
        //关闭本页去切换城市，返回时就可以重新初始化定位信息哦
        wx.reLaunch({
            url: '../switchcity/switchcity'
        });
    },
    // 使用该函数可以返回到首页
    gotoWeather: function () {
        wx.navigateTo({
            url: '../weather/weather'
        });
    },
    gotoNavigation: function (e) {
        wx.navigateTo({
            //url: e.currentTarget.dataset['index']
            url : '../movies/movies'
        });
    }
    
})

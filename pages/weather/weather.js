//获取应用实例
var app = getApp()
Page({
  data: {
    weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    showday: ['今天', '明天', ''],
    city:'', //城市
    district:'', //区域
    now:'',
    forecast:'',//七日天气预报
    brf:'',
    bj_src:''
  },

  onLoad: function () {
    var that = this;
    var date = new Date();
    //设置数组第三个是周几
    that.setData({
      'showday[2]': this.data.weekday[(date.getDay() + 2) % 7],
    });
  },

  onShow: function () {
    var that = this;
    var city = app.globalData.defaultCity.slice(0, 2);
    that.setData({
      city: app.globalData.defaultCity, //今天天气情况数组 
      district: app.globalData.defaultCounty //生活指数
    });
    that.getWeather(city);//获得天气
  },

  //从全局变量直接获取天气信息，首页加载时存的
  getWeather: function (city) {
    var that = this;
    let codeTxt = app.globalData.weatherData.now.cond_txt;
    let imgSrc = "../../images/weather/qingtian.jpg";
    if(codeTxt.indexOf('雨') >= 0){
        imgSrc = "../../images/weather/yutian.jpg";
        //imgSrc = "http://chuantu.biz/t6/351/1533002753x-1404793423.jpg";
    }
    else if(codeTxt.indexOf('阴') >= 0){
        let imgSrc = "../../images/weather/yintian.jpg";
      //imgSrc = "http://chuantu.biz/t6/351/1533006032x-1404758389.jpg";
    }
    that.setData({
          bj_src: imgSrc, // 背景图
          now: app.globalData.weatherData.now, //今天天气情况数组
          brf: app.globalData.weatherData.lifestyle[1],
          forecast: app.globalData.weatherData.daily_forecast
    });
  },

  bindCity: function (e) {
    wx.reLaunch({
      url: '../switchcity/switchcity'
    });
  }

});
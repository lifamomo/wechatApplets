// user.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo:false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },
    onLoad: function (){
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        }
    },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo:true
        })
    },
});
// logs.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    areaName:null,
    mobilePhone:null
  },

  inputName: function (even) {
    this.setData({
      name: even.detail.value
    })
  },

  inputPassword: function (even) {
    this.setData({
      password: even.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    // var token = wx.getStorageSync('Token')
    var name = e.detail.value.name;         //获取input初始值
    var password = e.detail.value.password;    //获取input初始值

    wx.request({
      method: 'POST',
      url: 'https://weixin.yaoshihe.cn:950/peasant/account/login?userName=' + name + '&pwd='+password, //接口地址
      data: {},
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res)
        var token = res.data.data.Token;
        var Token = wx.setStorageSync('Token',token);
        var name = res.data.data.AccountName;
        var Name = wx.setStorageSync('Name', name);
        var areaName = res.data.data.AreaName;
        var AreaName = wx.setStorageSync('AreaName', areaName);
        var mobilePhone = res.data.data.MobilePhone;
        var MobilePhone = wx.setStorageSync('MobilePhone', mobilePhone);
        if (res.data.ret==1){
          wx.reLaunch({
             url: '../index/index',
           })
        }
      },
      fail: function (res) {
        console.log('错误' + ':' + res)
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '农户操作平台',
      desc: '我正在使用，快来使用吧',
      path: '/page/index/index'
    }
  }
})
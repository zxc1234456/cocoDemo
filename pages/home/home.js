// pages/home/home.js


//获取应用实例
const app = getApp();

Page({
  data: {
    imgUrls:[
      "../../img/banner1.jpg",
      "../../img/banner2.jpg",
      "../../img/banner3.jpg",
      "../../img/banner4.jpg"
    ]
  },

  showmsg(){
    wx.showToast({
      title: '功能暂未开放'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载时先让用户授权登陆

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
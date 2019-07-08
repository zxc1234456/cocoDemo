
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:[
      "http://www.coco-tea.com.cn/images/News/CoCo%E5%BD%B1%E9%99%A2.jpg",
      "http://www.coco-tea.com.cn/images/News/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190513112202.jpg",
      "http://www.coco-tea.com.cn/images/News/%E5%92%96%E5%95%A1.jpg",
      "http://www.coco-tea.com.cn/images/News/%E5%AE%98%E7%BD%91%E5%B0%8F.png",
      "http://www.coco-tea.com.cn/images/News/%E5%AE%98%E7%BD%91%E5%B0%8FBanner.jpg",
      "http://www.coco-tea.com.cn/images/News/%E7%BA%A2%E6%9E%9C%E6%A1%83%E6%A1%83%E5%AE%98%E7%BD%91%E5%B0%8Fbanner_%E7%BA%A2%E6%9E%9C.jpg",
      "http://www.coco-tea.com.cn/images/News/%E7%BA%A2%E6%9E%9C%E6%A1%83%E6%A1%83%E5%AE%98%E7%BD%91%E5%B0%8Fbanner_%E6%A1%83%E6%A1%83.jpg"
    ],
    videoSrc: "http://58.144.252.236/697895F882E35715858873CD2/03000801004F057B996545055900336AAC310E-1338-78FE-120C-A51E8285F2D2.mp4?ccode=050F&duration=149&expire=18000&psid=6d43f2fc10f2f884cd37c80535d9f88f&ups_client_netip=7139f560&ups_ts=1562334090&ups_userid=&utid=wGOeFfSVzEYCAd4qTAhjn97M&vid=XMjEyNTYwMzE4NA%3D%3D&vkey=A182c6a105ecb4c6d4b3bd7a7821cc411&sp=&bc=1&ali_redirect_domain=ykugc.cp31.ott.cibntv.net&ali_redirect_ex_ftag=3b89bc08fb60c3d2dbf0d777ac2a1b5aff62e5e016c68266&ali_redirect_ex_tmining_ts=1562334340&ali_redirect_ex_tmining_expire=3600&ali_redirect_ex_hot=0",

  },
  showModal() {
    var that = this;
    wx.showModal({
      title: '余额提醒',
      content: '看看你卡里的余额你得瑟个什么劲',
      confirmText: "继续得瑟",
      cancelText: "我匿了",
      success(res) {
        if (res.confirm) {
          wx.setStorageSync('isPlay', true);
          that.videoCtx.play();
          that.setData({
            flag: true
          })
          wx.showToast({
            title: '土豪,请继续',
            icon: 'success',
            duration: 500
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
          that.videoCtx.pause();
          that.setData({
            flag: true
          })
          wx.showToast({
            title: '你取消观看',
            icon: 'fail',
            duration: 500
          })
        }
      }
    })

  },
  bindInputBlur(e) {
    this.setData({
      inp: e.detail.value
    })
  },

  bindSendDanmu() {
    this.videoCtx.sendDanmu({
      text: this.data.inp,
      color: getRandomColor()
    })
    this.setData({
      inp: ""
    })

  },

  // 获取视频 src 
  bindButtonTap() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          videoSrc: res.tempFilePath
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType;
        console.log(networkType);
        wx.setStorageSync("isPlay", networkType == 'wifi');
      }
    })

    wx.onNetworkStatusChange(function (res) {
      wx.setStorageSync("isPlay", res.networkType == 'wifi');
  
    })
    this.videoCtx = wx.createVideoContext('myVideo')
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
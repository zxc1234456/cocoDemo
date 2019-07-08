// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据加载完成显示true
    show:false,
    // 侧边导航
    navs:[],
    // 右边数据
    goods:[],
    // 高亮字体
    count:0,
    // 筛选后数据
    fgood:[],
    imgflag:false,
    choiceflag:false,
    bigimg:'',
    bigprice:'',
    bigname:'',
    jialiao:[
      { name: 'changhui', value: '常规', checked: 'true' },
      { name: 'zhenzhu', value: '珍珠'},
      { name: 'yeguo', value: '椰果' }
    ],
    wendu: [
      { name: 'changguibing', value: '常规冰', checked: 'true' },
      { name: 'duobing', value: '多冰' },
      { name: 'shaobing', value: '少冰' },
      { name: 'qubing', value: '去冰' }
    ],
    tangdu: [
      { name: 'changguitang', value: '常规糖', checked: 'true' },
      { name: 'bantang', value: '半糖' },
      { name: 'weitang', value: '微糖' },
      { name: 'bujiatang', value: '不加糖' }
    ],
    cjialiao:"",
    cwendu:"",
    ctangdu:""
  },

  countchange(e){
    console.log(e.target.dataset.idx);
    this.setData({
      count:e.target.dataset.idx
    })
    var sp = this.data.navs[e.target.dataset.idx];
    var data=this.data.goods.filter((item)=>{
      return item.value==sp
    })
    this.setData({
      fgood: data
    })
  },

  // 点击图片放大
  bigphoto(e){
    console.log(e)
    this.setData({
      imgflag:true,
      bigname:e.target.dataset.name,
      bigimg: e.target.dataset.img,
      bigprice: e.target.dataset.price,
    })
  },

  // 点击放大图片消失
  nobigphoto(){
    this.setData({
      imgflag: false
    })
  },

  //点击跳转选项弹窗 
  goshopcar(e){
    console.log(e);
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(()=>{
      this.setData({
        imgflag: false,
        choiceflag: true,
        bigname: e.target.dataset.name
      })
      wx.hideLoading();
    },500)
  },

  // 所有弹框消失
  nochoice(){
    this.setData({
      choiceflag: false,
      imgflag:false
    })
  },

  noclose(){

  },

// 选项的值
  radioChange1: function (e) {
    console.log('加料:', e.detail.value)
    this.setData({
      cjialiao: e.detail.value
    })
  },
  radioChange2: function (e) {
    console.log('温度:', e.detail.value)
    this.setData({
      cwendu: e.detail.value
    })
  },
  radioChange3: function (e) {
    console.log('糖度:', e.detail.value)
    this.setData({
      ctangdu: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      method: "GET",
      url: 'http://localhost:1901/wx/getGoodType', //仅为示例，并非真实的接口地址
      success: res => {
        console.log(res.data)
        setTimeout(() => {
          this.setData({
            navs: res.data.result,
            show: true
          })
        }, 1000)
      }
    })
    wx.request({
      method: "GET",
      url: 'http://localhost:1901/wx/getAllGood', //仅为示例，并非真实的接口地址
      success: res => {
        console.log(res.data)
        setTimeout(() => {
          this.setData({
            goods: res.data.result,
            show: true
          })
          // 给初始数据复制
          var data = this.data.goods.filter((item) => {
            return item.value == "醇香奶茶"
          })
          this.setData({
            fgood: data
          })
        }, 1000)
        wx.showToast({
          title: '请求成功',
        })
      }
    })
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
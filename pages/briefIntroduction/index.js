// pages/briefIntroduction/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 30.451172,
    longitude: 106.631828,
    markers: [{
      title:'位置所在',
     //可以请求接口获取当前自己的经纬度
      id: 0,
      latitude: 30.45209,
      longitude: 106.63453,
      width: 30,
      height: 30
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.chooseLocation({
    //   complete: (res) => {
    //     console.log(res)
    //   },
    // })
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
// pages/seach/index.js
let DB =  wx.cloud.database().collection("goodsList")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [],
    pageNumber: -1,
    typeName: undefined,
    isOk: false
  },
  //点击搜索
  getList(){
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    that.data.pageNumber += 1
    DB.where({
      typeName: that.data.typeName
    }).skip(20 * that.data.pageNumber)
    .get()
    .then(res=>{
      wx.hideLoading()
      let ok = res.data.length < 20
      that.setData({
        typeList: [...that.data.typeList, ...res.data],
        isOk: ok
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
      type: options.name
     })
     this.getList()
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
     this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(!this.data.isOk) this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/seach/index.js
let DB =  wx.cloud.database().collection("goodsList")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: undefined,
    searchList: [],
    pageNumber: -1,
    isOk: false
  },
  //点击搜索
  changSearch(e){
    const value = e.detail.value
    let that = this
    that.setData({
      searchValue: value,
      pageNumber: -1
    })
    that.getList()
  },
  getList(){
    let that = this
    if(!that.data.searchValue) {
      wx.stopPullDownRefresh()
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    that.data.pageNumber += 1
    wx.cloud.callFunction({
      name: "getGoodsList",
      data: {
        name: that.data.searchValue,
        pageNumber: that.data.pageNumber
      },
      success(res){
        wx.hideLoading()
        wx.stopPullDownRefresh()
        let ok = res.result.data.length < 20
        that.setData({
          searchList: [...that.data.searchList,...res.result.data],
        isOk: ok
        })
      },
      fail(err) {
        console.log(err)
        wx.hideLoading()
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
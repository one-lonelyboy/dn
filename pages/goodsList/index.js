// pages/goodsList/index.js
const DB = wx.cloud.database().collection("goodsList")
const DC = wx.cloud.database().collection("goodsType")
Page({

  /**
   * 页面的初始数据
   */
  async  getdata() {
    let that = this
     const goodsType = await DC.get()
     that.setData({
      goodsType: goodsType.data
     })
     that.getList()
  },
  getList(){
    let that = this
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    that.data.pageNumber += 1
    let name = that.data.typeName ? that.data.typeName : that.data.goodsType[0].name
    DB.where({
      typeName: name
     }).skip(20 * that.data.pageNumber).get({
       success(res) {
         wx.hideLoading()
         let ok = res.data.length < 20
         that.setData({
          goodsList:that.data.goodsList.concat(res.data),
          isOk: ok
         })
       }
     })
  },
  changelist(e){
    let that = this
    that.setData({
      chengeIndex: e.currentTarget.dataset.index,
      typeName: e.currentTarget.dataset.name,
      goodsList: [],
      pageNumber: -1
    })
    that.getList()
  },
  data: {
      goodsList: [],
      height: "510px",
      goodsType: [],
      chengeIndex: 0,
      typeName: undefined,
      isOk:false,
      pageNumber: -1
  },
  getcrolltolower(e){
    if(!this.data.isOk) this.getList()
  },
  getscrollList(e) {
    console.log(e,222)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
    const hwight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: `${(hwight -45)}px`
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